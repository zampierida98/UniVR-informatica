.section .text
	.global fascia
	.type fascia, @function
	
fascia:
	# l'indirizzo della stringa di output si trova gia' in EDI
	# il contatore delle posizioni si trova gia' in ECX
	# il carico complessivo del circuito si trova gia' in EAX
	
	cmpl $150, %eax
	jle f1
	
	cmpl $300, %eax
	jle f2
	
	cmpl $450, %eax
	jle f3
	
	jmp ol
	
f1:
	# scrivo "F1\n" sulla stringa di output:
	movb $70, (%ecx,%edi,1)
	inc %ecx
	movb $49, (%ecx,%edi,1)
	inc %ecx
	jmp fine
	
f2:
	# scrivo "F2\n" sulla stringa di output:
	movb $70, (%ecx,%edi,1)
	inc %ecx
	movb $50, (%ecx,%edi,1)
	inc %ecx
	jmp fine
	
f3:
	# scrivo "F3\n" sulla stringa di output:
	movb $70, (%ecx,%edi,1)
	inc %ecx
	movb $51, (%ecx,%edi,1)
	inc %ecx
	jmp fine
	
ol:
	# scrivo "OL\n" sulla stringa di output:
	movb $79, (%ecx,%edi,1)
	inc %ecx
	movb $76, (%ecx,%edi,1)
	inc %ecx

fine:
	movb $10, (%ecx,%edi,1)
	inc %ecx
	ret
