#include <stdlib.h>
#include <stdio.h>

#include <sys/ipc.h>
#include <sys/sem.h>
#include <sys/shm.h>
#include <fcntl.h>
#include <string.h>
#include <unistd.h>

#include "errExit.h"
#include "structures.h"

#define SIZE 100

// ClientExec: programma incaricato di eseguire il servizio richiesto dall'utente

void semOp(int semid, unsigned short sem_num, short sem_op) {
	// funzione abbreviata per usare la system call semop (per una singola operazione)
    struct sembuf sop = {.sem_num = sem_num, .sem_op = sem_op, .sem_flg = 0};
    if(semop(semid, &sop, 1) == -1)
        errExit("semop failed");
}

int main (int argc, char *argv[]) {
    
    // controllo degli argomenti passati da riga di comando
    if(argc <= 3) {
        printf("Usage: %s utente chiave [parametri servizio]\n", argv[0]);
        return 0;
    }
    
    // accesso al segmento di memoria condivisa
    key_t shmkey = ftok("../.", 1);
    
	int shmid = shmget(shmkey, SIZE * sizeof(struct Triplet), S_IRUSR | S_IWUSR);
    if(shmid == -1)
        errExit("shmget failed");
        
    void *shptr = shmat(shmid, NULL, 0);
    if(shptr == (void *)-1)
        errExit("shmat failed");
    struct Triplet *base = (struct Triplet *)shptr;
    
    // accesso al set di semafori
    key_t semkey = ftok("../.", 2);
    
	int semid = semget(semkey, 2, S_IRUSR | S_IWUSR);
	if(semid == -1)
		errExit("semget failed");

	// verifica della validita' della chiave fornita
	int key = -1;
	
	/* ==========MUTUA ESCLUSIONE========== */
	semOp(semid, 0, -1);
	
	int numKey = semctl(semid, 1, GETVAL, 0);
	if(numKey == -1)
		printf("semctl GETVAL failed\n");
	
	int i;
	struct Triplet *t;
	for(i = 0; i < numKey; i++) {
		t = base + i;
		if(t->key != -1 && strcmp(argv[1], t->utente) == 0 && atoi(argv[2]) == t->key) {
			key = t->key;
			t->key = -1;
			break;
		}
	}

	semOp(semid, 0, 1);
	/* ==========MUTUA ESCLUSIONE========== */
    
    if(key == -1) {
    	printf("La chiave fornita non e' valida!\n");
    	return 0;
    }
    
    // esecuzione del servizio richiesto utilizzando la lista dei parametri da riga di comando
    if((key & (1<<29)) == 0) {
    	execv("./stampa", &argv[3]);
		errExit("execvp failed");
	} else if((key & (1<<30)) == 0) {
		execv("./salva", &argv[3]);
		errExit("execvp failed");
	} else {
		execv("./invia", &argv[3]);
		errExit("execvp failed");
	}
    
    return 0;
}
