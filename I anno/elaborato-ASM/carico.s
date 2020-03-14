.section .text
	.global carico
	.type carico, @function
	
carico:
	# l'indirizzo della stringa di input si trova gia' in ESI
	# il contatore delle posizioni si trova gia' in ECX
	# INT_DW e INT_WM si trovano gia' in DL e DH
	
	# il carico complessivo del circuito viene calcolato su EAX:
	movl $0, %eax
	
forno:
	# lettura di un carattere (LOAD) dalla stringa di input:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	# se LOAD e' uguale a 0 passo al dispositivo successivo, altrimenti sommo il consumo a EAX:
	cmpb $48, %bl
	je frigo
	addl $200, %eax
	
frigo:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	cmpb $48, %bl
	je aspirapolvere
	addl $30, %eax
	
aspirapolvere:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	cmpb $48, %bl
	je phon
	addl $120, %eax
	
phon:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	cmpb $48, %bl
	je lavastoviglie
	addl $100, %eax
	
lavastoviglie:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	cmpb $48, %bl
	je lavatrice
	
	# se INT_DW e' uguale a 0 passo al dispositivo successivo, altrimenti sommo il consumo a EAX:
	cmpb $0, %dl
	je lavatrice
	addl $200, %eax
	
lavatrice:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	cmpb $48, %bl
	je lamp_60
	
	# se INT_WM e' uguale a 0 passo al dispositivo successivo, altrimenti sommo il consumo a EAX:
	cmpb $0, %dh
	je lamp_60
	addl $180, %eax
	
lamp_60:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	cmpb $48, %bl
	je lamp_100
	addl $24, %eax

lamp_100:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	cmpb $48, %bl
	je hi_fi
	addl $40, %eax
	
hi_fi:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	cmpb $48, %bl
	je tv
	addl $20, %eax
	
tv:
	movb (%ecx,%esi,1), %bl
	inc %ecx
	
	cmpb $48, %bl
	je fine
	addl $40, %eax

fine:
	ret
