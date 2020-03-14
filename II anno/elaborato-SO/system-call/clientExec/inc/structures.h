#ifndef STRUCTURES_H
#define STRUCTURES_H

#define SIZE 100
#define MSG_BODY 10

struct Triplet {
	char utente[SIZE];
	int key;
	unsigned int timestamp;
};

struct message {
    long mtype;
    char mtext[MSG_BODY][SIZE];
};

#endif
