import { LoadingSpin } from '@/components/loading-spin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type SyntheticEvent, useState } from 'react'

interface MailLoginProps {
	signMode: 'sign-in' | 'sign-up'
}

export const MailLogin = ({ signMode }: MailLoginProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onSubmit(event: SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="grid gap-2">
				<div className="grid gap-1">
					<Label className="sr-only" htmlFor="email">
						Email
					</Label>
					<Input
						id="email"
						placeholder="seuemail@email.com"
						type="email"
						autoCapitalize="none"
						autoComplete="email"
						autoCorrect="off"
						disabled={isLoading}
					/>
				</div>
				<Button disabled={isLoading}>
					{isLoading && <LoadingSpin />}
					{signMode === 'sign-in'
						? 'Entrar com e-mail'
						: 'Criar com e-mail'}
				</Button>
			</div>
		</form>
	)
}
