controller: carico.o controller.o controller_asm.o fascia.o scrivi_int.o spento.o
	gcc -o controller carico.o controller.o controller_asm.o fascia.o scrivi_int.o spento.o -m32
	
carico.o: carico.s
	gcc -c carico.s -o carico.o -m32
controller.o: controller.c
	gcc -c -o controller.o controller.c -m32
controller_asm.o: controller_asm.s
	gcc -c controller_asm.s -o controller_asm.o -m32
fascia.o: fascia.s
	gcc -c fascia.s -o fascia.o -m32
scrivi_int.o: scrivi_int.s
	gcc -c scrivi_int.s -o scrivi_int.o -m32
spento.o: spento.s
	gcc -c spento.s -o spento.o -m32
	
clean:
	rm -rf *.o controller
