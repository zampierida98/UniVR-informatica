.section .text
	.global scrivi_int
	.type scrivi_int, @function
	
scrivi_int:
	# l'indirizzo della stringa di output si trova gia' in EDI
	# il contatore delle posizioni si trova gia' in ECX
	# il valore dell'interruttore da scrivere si trova gia' in DL
	
	cmpb $1, %dl
	je scrivi_uno
	
scrivi_zero:
	movb $48, (%ecx,%edi,1)
	jmp fine
	
scrivi_uno:
	movb $49, (%ecx,%edi,1)
	
fine:
	inc %ecx
	ret
