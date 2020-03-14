#include <stdlib.h>
#include <stdio.h>

// Stampa: riporta su terminale tutti gli argomenti ricevuti da linea di comando

int main (int argc, char *argv[]) {
	printf("Benvenuto nel programma Stampa!\n\n");
    printf("Ecco la lista degli argomenti ricevuti da linea di comando:\n");
    
    int i;
    for(i = 0; i < argc; i++)
    	printf("%s\n", argv[i]);
	
    return 0;
}
