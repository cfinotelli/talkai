import { MessageCircleHeart } from 'lucide-react'

export const CopyrightSection = () => {
	return (
		<div className="relative hidden h-full flex-col bg-primary p-10 text-white dark:border-r lg:flex">
			<div className="relative z-20 flex items-center text-lg font-medium gap-2">
				<MessageCircleHeart />
				Talkaí
			</div>
			<div className="relative z-20 mt-auto">
				<blockquote className="space-y-2">
					<p className="text-lg">
						No nosso aplicativo, você pode se conectar com outras pessoas
						e compartilhar suas ideias, histórias e experiências. Se não
						houver ninguém disponível para conversar, não se preocupe!
						Você pode interagir com a nossa Inteligência Artificial, que
						está sempre pronta para ouvir e responder.
					</p>
				</blockquote>
			</div>
		</div>
	)
}
