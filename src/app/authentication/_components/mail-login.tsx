'use client'

import { LoadingSpin } from '@/components/loading-spin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const loginFormSchema = z.object({
	email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
})

type LoginFormProps = z.infer<typeof loginFormSchema>

export const MailLogin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm<LoginFormProps>({
		resolver: zodResolver(loginFormSchema),
	})

	async function onSubmit(event: LoginFormProps) {
		await signIn('email', {
			email: event.email,
			redirectT: '/',
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
						{...register('email')}
					/>
					{errors.email && <span>{errors.email.message}</span>}
				</div>

				<Button disabled={isLoading}>
					{isLoading && <LoadingSpin />}
					Entrar com e-mail
				</Button>
			</div>
		</form>
	)
}
