.section .text
	.global spento
	.type spento, @function
	
spento:
	# l'indirizzo della stringa di output si trova gia' in EDI
	# il contatore delle posizioni si trova gia' in ECX
	
	# scrivo "000-00\n" sulla stringa di output un carattere alla volta:
	movb $48, (%ecx,%edi,1)
	inc %ecx
	
	movb $48, (%ecx,%edi,1)
	inc %ecx
	
	movb $48, (%ecx,%edi,1)
	inc %ecx
	
	movb $45, (%ecx,%edi,1)
	inc %ecx
	
	movb $48, (%ecx,%edi,1)
	inc %ecx
	
	movb $48, (%ecx,%edi,1)
	inc %ecx
	
	movb $10, (%ecx,%edi,1)
	inc %ecx

	ret
