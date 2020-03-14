#include <stdlib.h>
#include <stdio.h>

#include <sys/msg.h>
#include <sys/stat.h>
#include <string.h>

#include "errExit.h"
#include "structures.h"

// Invia: deposita tutti gli argomenti ricevuti da linea di comando in una coda di messaggi

int main (int argc, char *argv[]) {
	printf("Benvenuto nel programma Invia!\n\n");
    
	int msqid = msgget(atoi(argv[0]), IPC_CREAT | S_IRUSR | S_IWUSR);

	struct message mymsg;
	mymsg.mtype = 1;

	int i;
    for(i = 1; i < argc; i++)
    	strcpy(mymsg.mtext[i-1], argv[i]);

    size_t mymsgSize = sizeof(struct message) - sizeof(long);
    if(msgsnd(msqid, &mymsg, mymsgSize, 0) == -1)
    	errExit("msgsnd failed");
    
    printf("Gli argomenti ricevuti sono stati depositati nella coda di messaggi con chiave %s\n", argv[0]);
    
    return 0;
}
