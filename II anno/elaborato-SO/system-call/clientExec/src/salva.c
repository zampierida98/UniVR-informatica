#include <stdlib.h>
#include <stdio.h>

#include <sys/stat.h>
#include <fcntl.h>
#include <string.h>
#include <unistd.h>

#include "errExit.h"

// Salva: riporta su file tutti gli argomenti ricevuti da linea di comando

int main (int argc, char *argv[]) {
	printf("Benvenuto nel programma Salva!\n\n");
    
	int fd = open(argv[0], O_RDWR | O_CREAT | O_TRUNC, S_IRUSR | S_IWUSR);
	if (fd == -1)
		errExit("open failed");

    int i;
    for(i = 1; i < argc; i++) {
    	if(write(fd, argv[i], strlen(argv[i])) != strlen(argv[i]))
    		errExit("write failed");
    	
    	if(write(fd, " ", 1) != 1)
    		errExit("write failed");
    }
    
    printf("Gli argomenti ricevuti sono stati riportati sul file %s\n", argv[0]);
    
    if(close(fd) == -1)
        errExit("close failed");
    
    return 0;
}
