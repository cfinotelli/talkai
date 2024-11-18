import type { Message } from '@/~types/app'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type UserMessage = {
	name: string
	image: string
}

interface ChatMessageProps {
	message: Message
	user: UserMessage
}

export const ChatMessage = ({ message, user }: ChatMessageProps) => {
	return (
		<div
			className="flex gap-3 text-sm text-slate-600 p-2 bg-slate-200 rounded-md w-full"
			key={String(message.createdAt)}
		>
			<Avatar>
				<AvatarFallback>
					{message.role === 'user' ? user.name.charAt(0) : 'Assistente'}
				</AvatarFallback>
				<AvatarImage
					src={String(
						message.role === 'user'
							? user.image
							: 'https://cdn.icon-icons.com/icons2/4042/PNG/512/bot_smile_robot_robo_chatbot_assistant_advisor_icon_256844.png'
					)}
				/>
			</Avatar>

			<p className="leading-relaxed">
				<span className="block font-bold text-slate-700">
					{message.role === 'user' ? user.name : 'Assistente'}
				</span>
				{/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
				{message.content !== undefined &&
					message.content.split('\n').map((message, index) => {
						return <span key={`msg-${index.toString()}`}>{message}</span>
					})}
			</p>
		</div>
	)
}
