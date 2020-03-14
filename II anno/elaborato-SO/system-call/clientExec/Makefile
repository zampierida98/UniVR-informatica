
CFLAGS=-Wall -std=gnu99
INCLUDES=-I./inc

# list source code files for clientExc executable
CLIENT_SRCS=src/clientExec.c src/errExit.c
# list source code files for salva executable
SALVA_SRCS=src/salva.c src/errExit.c
# list source code files for stampa executable
STAMPA_SRCS=src/stampa.c
# list source code files for inva executable
INVIA_SRCS=src/invia.c src/errExit.c

##------------------------------------------------------------------------------
## DO NOT TOUCH BELOW THIS LINE!
##------------------------------------------------------------------------------
CLIENT_OBJS=$(CLIENT_SRCS:.c=.o)
SALVA_OBJS=$(SALVA_SRCS:.c=.o)
STAMPA_OBJS=$(STAMPA_SRCS:.c=.o)
INVIA_OBJS=$(INVIA_SRCS:.c=.o)

all: clientExec salva stampa invia

clientExec: $(CLIENT_OBJS)
	@echo "Making executable: "$@
	@$(CC) $^ -o $@

salva: $(SALVA_OBJS)
	@echo "Making executable: "$@
	@$(CC) $^ -o $@

stampa: $(STAMPA_OBJS)
	@echo "Making executable: "$@
	@$(CC) $^ -o $@

invia: $(INVIA_OBJS)
	@echo "Making executable: "$@
	@$(CC) $^ -o $@

.c.o:
	@echo "Compiling: "$<
	@$(CC) $(CFLAGS) $(INCLUDES) -c $< -o $@

.PHONY: clean

clean:
	@rm -f src/*.o clientExec stampa salva invia
	@echo "Removed object files and executables..."
