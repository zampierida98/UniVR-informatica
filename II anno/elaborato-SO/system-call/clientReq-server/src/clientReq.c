#include <stdlib.h>
#include <stdio.h>

#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>
#include <unistd.h>

#include "errExit.h"
#include "structures.h"

#define SIZE 100

// ClientReq: programma utilizzato dall'utente per richiedere una chiave di utilizzo per un servizio di sistema

char *serverPath = "/tmp/FIFOSERVER";
char *baseClientPath = "/tmp/FIFOCLIENT.";

int main (int argc, char *argv[]) {

	// stampa del messaggio di benvenuto e dell'elenco dei servizi di sistema
    printf("Benvenuto nel programma ClientReq!\n\n");
    
    printf("Sono disponibili i seguenti servizi di sistema:\n");
    printf("\t- Stampa\n");
    printf("\t- Salva\n");
    printf("\t- Invia\n\n");

	// creazione di FIFOCLIENT
    char clientPath[SIZE];
    sprintf(clientPath, "%s%d", baseClientPath, getpid());
    if(mkfifo(clientPath, S_IRUSR | S_IWUSR | S_IWGRP) == -1)
        errExit("mkfifo failed");
        
    // apertura di FIFOSERVER e spedizione della richiesta
	int fdServer = open(serverPath, O_WRONLY);
	if(fdServer == -1)
		errExit("open failed");

	struct Request request;
	request.clientPid = getpid();
    printf("Inserire un codice identificativo: ");
    scanf("%s", request.utente);
    printf("Inserire il nome di un servizio: ");
    scanf("%s", request.servizio);

    if(write(fdServer, &request, sizeof(struct Request)) != sizeof(struct Request))
        errExit("write failed");
    
    // apertura di FIFOCLIENT e ricezione della risposta
    int fdClient = open(clientPath, O_RDONLY);
    if(fdClient == -1)
        errExit("open failed");

    struct Response response;
    
	if(read(fdClient, &response, sizeof(struct Response)) != sizeof(struct Response))
		errExit("read failed");

	if(response.key != -1)
		printf("\nLa chiave per l'utilizzo del servizio e': %d\n", response.key);
	else
		printf("\nIl servizio richiesto non e' disponibile: nessuna chiave generata!\n");

    // chiusura delle FIFO e rimozione di FIFOCLIENT
    if(close(fdServer) != 0 || close(fdClient) != 0)
        errExit("close failed");

    if (unlink(clientPath) != 0)
        errExit("unlink failed");

    return 0;
}
