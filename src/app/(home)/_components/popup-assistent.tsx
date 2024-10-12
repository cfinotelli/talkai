'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ModalChat } from './modal-chat'

export const PopupAssistent = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div className="relative w-screen h-screen">
			<div className="absolute bottom-5 right-5">
				<Button
					variant="default"
					size={'lg'}
					onClick={() => setIsOpen(true)}
				>
					Falar com IA
				</Button>

				{isOpen && <ModalChat closeModal={() => setIsOpen(false)} />}
			</div>
		</div>
	)
}
