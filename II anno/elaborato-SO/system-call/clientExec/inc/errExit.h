#ifndef ERREXIT_H
#define ERREXIT_H

/* errExit is a support function to print
 * the error message of the last failed system call.
 * errExit terminates the calling process as well.
 */
void errExit(const char *msg);

#endif
