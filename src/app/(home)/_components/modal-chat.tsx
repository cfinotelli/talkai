'use client'

import { LoadingSpin } from '@/components/loading-spin'
import { ChatMessage } from '@/components/message'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { formatRelativeToNow } from '@/helpers/format-relative-to-now'
import { sendRequestChatMessage } from '@/server/actions/prompt-chat'
import type { Message } from '@/~types/app'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ModalChat = ({ closeModal }: { closeModal: () => void }) => {
	const { data } = useSession()
	const user = data?.user
	const [messages, setMessages] = useState<Message[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	console.log(messages)

	const schemaChatObject = z.object({
		prompt: z.string().min(1, 'Please enter a prompt.'),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<z.infer<typeof schemaChatObject>>({
		defaultValues: {
			prompt: '',
		},
		resolver: zodResolver(schemaChatObject),
	})

	async function handleSendMessage(data: z.infer<typeof schemaChatObject>) {
		const newMessage: Message = {
			role: 'user',
			content: data.prompt,
			createdAt: new Date(),
		}

		setIsLoading(true)

		setMessages(prevMessages => [...prevMessages, newMessage])

		const { assistentMessage: responseMessage } =
			await sendRequestChatMessage(data.prompt)

		reset()

		const assistentMessage: Message = {
			role: 'assistant',
			content: responseMessage,
			createdAt: new Date(),
		}

		setIsLoading(false)

		setMessages(prevMessages => [...prevMessages, assistentMessage])
	}

	const lastMessage = messages[messages.length - 1]

	return (
		<div className="fixed sm:bottom-2 sm:right-2 bottom-0 right-0 max-w-[400px] w-full">
			<Card className="w-full">
				<CardHeader className="flex flex-row justify-between relative">
					<div className="">
						<CardTitle>Conversa com: Assistente</CardTitle>
						<CardDescription>
							<strong>Esta conversa não será salva!</strong>
							<br />
							{lastMessage?.createdAt
								? `Última mensagem enviada ${formatRelativeToNow(
										String(lastMessage.createdAt)
									)}.`
								: 'Nenhuma mensagem enviada ainda.'}
						</CardDescription>
					</div>
					<Button onClick={closeModal} variant="outline" size="icon">
						X
					</Button>
				</CardHeader>

				<Separator className="mb-6" />

				<CardContent className="max-h-[400px] overflow-y-auto space-y-2">
					{messages.map(message => (
						<ChatMessage
							key={String(message.createdAt)}
							message={message}
							user={{
								name: user?.name as string,
								image: user?.image as string,
							}}
						/>
					))}
					{isLoading && (
						<div className="flex justify-center">
							<LoadingSpin />
						</div>
					)}
				</CardContent>

				<Separator className="my-4" />

				<CardFooter>
					<form
						className="flex space-x-2 w-full"
						onSubmit={handleSubmit(handleSendMessage)}
					>
						<Input
							disabled={isLoading}
							className="flex-grow"
							placeholder="Digite sua mensagem"
							{...register('prompt')}
						/>
						{errors.prompt && (
							<p className="text-xs text-red-400">
								{errors.prompt.message}
							</p>
						)}
						<Button
							disabled={isLoading}
							variant="outline"
							size="icon"
							type="submit"
						>
							<Send size={16} />
						</Button>
					</form>
				</CardFooter>
			</Card>
		</div>
	)
}
