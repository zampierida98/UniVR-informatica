#include <stdlib.h>
#include <stdio.h>

#include <sys/ipc.h>
#include <sys/sem.h>
#include <sys/shm.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <limits.h>
#include <signal.h>
#include <string.h>
#include <time.h>
#include <unistd.h>

#include "errExit.h"
#include "structures.h"

#define SIZE 100

// Server: programma responsabile del rilascio delle chiavi di utilizzo per i servizi di sistema

char *serverPath = "/tmp/FIFOSERVER";
char *baseClientPath = "/tmp/FIFOCLIENT.";
int fdServer, fdServerExtra;

int shmid, semid;
struct Triplet *base;

pid_t forkPid;

void quit(int sig) {
	if(sig == SIGTERM) {
        if(forkPid == 0) {				// KeyManager termina alla ricezione del segnale SIGTERM
        	_exit(0);
        } else {						// Server invia il segnale SIGTERM al processo KeyManager
        	kill(forkPid, SIGTERM);
        	wait(NULL);
        }
	}
	
	// chiusura delle FIFO e rimozione di FIFOSERVER
	if(fdServer != 0 && close(fdServer) == -1)
		errExit("close failed");

	if(fdServerExtra != 0 && close(fdServerExtra) == -1)
		errExit("close failed");

	if(unlink(serverPath) != 0)
		errExit("unlink failed");
		
	// rimozione del segmento di memoria condivisa
	if(shmdt(base) == -1)
		errExit("shmdt failed");

	if(shmctl(shmid, IPC_RMID, NULL) == -1)
		errExit("shmctl failed");
		
	// rimozione del set di semafori
	if(semctl(semid, 0, IPC_RMID, NULL) == -1)
		errExit("semctl IPC_RMID failed");

	_exit(0);
}

void semOp(int semid, unsigned short sem_num, short sem_op) {
	// funzione abbreviata per usare la system call semop (per una singola operazione)
    struct sembuf sop = {.sem_num = sem_num, .sem_op = sem_op, .sem_flg = 0};
    if(semop(semid, &sop, 1) == -1)
        errExit("semop failed");
}

int keyGen(char *servizio) {
	// funzione per la generazione della chiave
    int key = time(NULL);

	unsigned int mask = UINT_MAX>>3;
	int base = key & mask;
	
	if(strcmp(servizio, "Stampa") == 0 || strcmp(servizio, "stampa") == 0 || strcmp(servizio, "STAMPA") == 0) {
		key = base;
	} else if(strcmp(servizio, "Salva") == 0 || strcmp(servizio, "salva") == 0 || strcmp(servizio, "SALVA") == 0) {
		key = base | (1<<29);
	} else if(strcmp(servizio, "Invia") == 0 || strcmp(servizio, "invia") == 0 || strcmp(servizio, "INVIA") == 0) {
		key = base | (1<<30) | (1<<29);
	} else {
		key = -1;
	}
	
	return key;
}

void sendResponse(struct Request *request) {

	struct Response response;
    response.key = keyGen(request->servizio);
	
	/* ==========MUTUA ESCLUSIONE========== */
	semOp(semid, 0, -1);
	
	int numKey = semctl(semid, 1, GETVAL, 0);
	if(numKey == -1)
		printf("semctl GETVAL failed\n");

	// memorizzazione nel segmento di memoria condivisa tramite...
	int i;
	struct Triplet *t;
	int sostituita = 0;
	
	for(i = 0; i < numKey; i++) {
		t = base + i;
		if(t->key == -1) {
			// ...sostituzione in una tripletta esistente non piu' valida
			strcpy(t->utente, request->utente);
			t->key = response.key;
			t->timestamp = time(NULL);
			
			sostituita = 1;
			break;
		}
	}
	
	if(sostituita == 0) {
		// ...creazione di una nuova tripletta
		struct Triplet new;
		strcpy(new.utente, request->utente);
		new.key = response.key;
		new.timestamp = time(NULL);
		
		*(base + numKey) = new;
		semOp(semid, 1, 1);
	}

	semOp(semid, 0, 1);
	/* ==========MUTUA ESCLUSIONE========== */
    
    // apertura di FIFOCLIENT e spedizione della risposta
    char clientPath[SIZE];
    sprintf(clientPath, "%s%d", baseClientPath, request->clientPid);
    int fdClient = open(clientPath, O_WRONLY);
    if(fdClient == -1)
        errExit("open failed");

    if(write(fdClient, &response, sizeof(struct Response)) != sizeof(struct Response)) {
        printf("write failed\n");
    } else {
    	printf("Invio della chiave %d a %s...\n", response.key, request->utente);
    	fflush(stdout);
    }

    // chiusura di FIFOCLIENT
    if(close(fdClient) != 0)
        printf("close failed\n");
}

int main (int argc, char *argv[]) {

	printf("Benvenuto nel programma Server!\n");

	// blocco di tutti i segnali tranne SIGTERM
    sigset_t mySet;
    sigfillset(&mySet);
    sigdelset(&mySet, SIGTERM);
    sigprocmask(SIG_SETMASK, &mySet, NULL);

	if(signal(SIGTERM, quit) == SIG_ERR)
        errExit("change signal handler failed");
        
    // creazione di un segmento di memoria condivisa
    key_t shmkey = ftok("../.", 1);
    
    shmid = shmget(shmkey, SIZE * sizeof(struct Triplet), IPC_CREAT | IPC_EXCL | S_IRUSR | S_IWUSR);
    if(shmid == -1)
        errExit("shmget failed");
        
    void *shptr = shmat(shmid, NULL, 0);
    if(shptr == (void *)-1)
        errExit("shmat failed");
    base = (struct Triplet *)shptr;
    
    // creazione di un set di 2 semafori
    key_t semkey = ftok("../.", 2);
    
    semid = semget(semkey, 2, IPC_CREAT | IPC_EXCL | S_IRUSR | S_IWUSR);
    if(semid == -1)
        errExit("semget failed");
    
    unsigned short semValues[] = {1, 0};
    union semun arg;
    arg.array = semValues;

    if(semctl(semid, 0, SETALL, arg) == -1)
        errExit("semctl SETALL failed");
    
    // creazione del processo figlio KeyManager
    forkPid = fork();
    switch(forkPid) {
        case -1: {
            errExit("fork failed");
        }
        
        // KeyManager: programma responsabile della gestione di tutte le chiavi rilasciate
        case 0: {
        	// rimozione delle chiavi scadute dal segmento di memoria condivisa
        	while(1) {
        		sleep(30);
        		struct Triplet *t;
				int i = 0;
        		
        		/* ==========MUTUA ESCLUSIONE========== */
				semOp(semid, 0, -1);
				
				int numKey = semctl(semid, 1, GETVAL, 0);
				if(numKey == -1)
					printf("semctl GETVAL failed\n");
				
				for(i = 0; i < numKey; i++) {
					t = base + i;
					if((t->timestamp + 300) < time(NULL) && t->key != -1) {
						printf("\nLa chiave %d di %s e' scaduta\n", t->key, t->utente);
						fflush(stdout);
						t->key = -1;
					}
				}

				semOp(semid, 0, 1);
				/* ==========MUTUA ESCLUSIONE========== */
        	}
        }
        
        default: {
            // creazione e apertura di FIFOSERVER
			if(mkfifo(serverPath, S_IRUSR | S_IWUSR | S_IWGRP) == -1)
				errExit("mkfifo failed");

			fdServer = open(serverPath, O_RDONLY);
			if(fdServer == -1)
				errExit("open failed");
			
			// apertura extra di FIFOSERVER (in sola scrittura per evitare di vedere EOF se non ci sono client)
			fdServerExtra = open(serverPath, O_WRONLY);
			if(fdServerExtra == -1)
				errExit("open failed");
			
			// attesa di una richiesta
			struct Request request;
			int numRead = -1;
			do {
				numRead = read(fdServer, &request, sizeof(struct Request));
				if(numRead == -1) {
				    printf("read failed\n");
				} else if(numRead != sizeof(struct Request) || numRead == 0) {
				    printf("invalid request\n");
				} else {
					printf("\n%s ha richiesto il servizio %s\n", request.utente, request.servizio);
					fflush(stdout);
				    sendResponse(&request);
				}
			} while(numRead != -1);
		}
    }
    
	quit(0);
}
