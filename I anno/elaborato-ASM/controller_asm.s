.section .data

	# valori degli interruttori:
	int_gen: .byte 0
	int_dw: .byte 0
	int_wm: .byte 0
	
	# contatore dei cicli in OVERLOAD:
	overload: .byte 0
	
	# contatori delle posizioni delle stringhe di input/output:
	input_pos: .long 0
	output_pos: .long 0


.section .text
	.global controller_asm

controller_asm:
	# scarico dallo stack i parametri:
	pushl %ebp
	movl %esp, %ebp
	movl 8(%ebp), %esi		# carico l'indirizzo della stringa di input in ESI
	movl 12(%ebp), %edi		# carico l'indirizzo della stringa di output in EDI
	
	
inizio:
	# inizializzo i registri che mi serviranno:
	movl $0, %ebx			# BL conterra' di volta in volta il carattere letto
	movl input_pos, %ecx	# ECX conterra' di volta in volta la posizione del carattere letto
	
	
res_gen:
	# lettura del primo carattere della riga (RES_GEN):
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	# se INT_GEN e' gia' uguale a 1, vado avanti:
	cmpb $1, int_gen
	je res_dw
	
	# altrimenti --> se RES_GEN e' uguale a 0, il sistema rimane spento:
	cmpb $48, %bl
	jne accensione
	
	addl $14, %ecx			# sommo 14 a ECX per mettermi in pari con le posizioni della stringa di input
	movl %ecx, input_pos	# aggiorno il contatore delle posizioni della stringa di input
	movl output_pos, %ecx	# carico il contatore delle posizioni della stringa di output in ECX
	call spento
	movl %ecx, output_pos	# aggiorno il contatore delle posizioni della stringa di output
	
	jmp ricomincia

accensione:
	# altrimenti --> se RES_GEN e' uguale a 1, INT_GEN, INT_DW e INT_WM commutano a 1:
	movb $1, int_gen
	movb $1, int_dw
	movb $1, int_wm
	
	
res_dw:
	# lettura del secondo carattere della riga (RES_DW):
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	# se INT_DW e' gia' uguale a 1, vado avanti:
	cmpb $1, int_dw
	je res_wm
	
	# altrimenti --> se RES_DW e' uguale a 1, INT_DW viene riarmato:
	cmpb $49, %bl
	jne res_wm
	movb $1, int_dw
	
	
res_wm:
	# lettura del terzo carattere della riga (RES_WM):
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	# se INT_WM e' gia' uguale a 1, vado avanti:
	cmpb $1, int_wm
	je calcola_carico
	
	# altrimenti --> se RES_WM e' uguale a 1, INT_WM viene riarmato:
	cmpb $49, %bl
	jne calcola_carico
	movb $1, int_wm
	
	
calcola_carico:
	# ignoro il carattere '-' e chiamo la funzione per il calcolo del carico complessivo:
	inc %ecx
	movb int_dw, %dl		# metto INT_DW in DL
	movb int_wm, %dh		# metto INT_WM in DH
	call carico
	
	
controllo_ol:
	# se il carico appena calcolato e' minore di 450 daW, azzero il contatore dei cicli in OVERLOAD:
	cmpl $450, %eax
	jg quarto_ciclo
	movb $0, overload
	jmp crea_output
	
quarto_ciclo:
	# altrimenti --> incremento il contatore dei cicli in OVERLOAD e controllo...
	addb $1, overload
	
	# ...se sono al quarto ciclo di OVERLOAD, il dispositivo commuta INT_DW a 0:
	cmpb $4, overload
	jne quinto_ciclo
	movb $0, int_dw
	jmp crea_output
	
quinto_ciclo:
	# ...se sono al quinto ciclo di OVERLOAD, il dispositivo commuta INT_WM a 0:
	cmpb $5, overload
	jne sesto_ciclo
	movb $0, int_wm
	jmp crea_output
	
sesto_ciclo:
	# ...se sono al sesto ciclo di OVERLOAD, il dispositivo commuta INT_GEN a 0 ed il sistema si spegne:
	cmpb $6, overload
	jne crea_output
	
	movb $0, int_gen
	movb $0, overload		# il contatore dei cicli in OVERLOAD riparte da 0
	addl $1, %ecx			# sommo 1 a ECX per mettermi in pari con le posizioni della stringa di input
	movl %ecx, input_pos	# aggiorno il contatore delle posizioni della stringa di input
	movl output_pos, %ecx	# carico il contatore delle posizioni della stringa di output in ECX
	call spento
	movl %ecx, output_pos	# aggiorno il contatore delle posizioni della stringa di output
	
	jmp ricomincia
	
	
crea_output:
	inc %ecx				# ignoro il carattere '\n'
	movl %ecx, input_pos	# aggiorno il contatore delle posizioni della stringa di input
	movl output_pos, %ecx	# carico il contatore delle posizioni della stringa di output in ECX
	
	# scrivo i valori degli interruttori:
	movb int_gen, %dl
	call scrivi_int
	
	movb int_dw, %dl
	call scrivi_int

	movb int_wm, %dl
	call scrivi_int
	
	# scrivo il carattere '-' e la fascia:
	movb $45, (%ecx,%edi,1)
	inc %ecx
	call fascia
	movl %ecx, output_pos	# aggiorno il contatore delle posizioni della stringa di output
	
	
ricomincia:	
	# se il carattere successivo nella stringa di input e' uguale a '\0', ho finito:
	movl input_pos, %ecx
	movb (%ecx,%esi,1), %bl
	cmpb $0, %bl
	je fine
	
	# altrimenti --> salto all'inizio per elaborare la riga successiva:
	jmp inizio
	
	
fine:
	# scrivo il carattere nullo alla fine della stringa di output:
	movl output_pos, %ecx
	movb $0, (%ecx,%edi,1)
	
	popl %ebp
	ret
