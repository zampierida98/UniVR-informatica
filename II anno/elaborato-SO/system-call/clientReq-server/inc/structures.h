#ifndef STRUCTURES_H
#define STRUCTURES_H

#include <sys/sem.h>
#include <sys/types.h>

#define SIZE 100

struct Request {
	pid_t clientPid;
	char utente[SIZE];
	char servizio[SIZE];
};

struct Response {
	int key;
};

struct Triplet {
	char utente[SIZE];
	int key;
	unsigned int timestamp;
};

union semun {
    int val;
    struct semid_ds *buf;
    unsigned short *array;
};

#endif
