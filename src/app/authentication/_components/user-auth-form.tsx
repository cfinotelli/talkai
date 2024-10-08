'use client'

import type { Icon } from '@/@types/elements'
import { GithubIcon, GoogleIcon } from '@/assets/icons'
import { ButtonWithIcon } from '@/components/button-with-icon'
import { LoadingSpin } from '@/components/loading-spin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { OAuthProviderType } from 'next-auth/providers/oauth-types'
import { signIn } from 'next-auth/react'
import { type ComponentProps, type SyntheticEvent, useState } from 'react'

interface UserAuthFormProps extends ComponentProps<'div'> {
	signMode: 'sign-in' | 'sign-up'
}

export const UserAuthForm = ({
	className,
	signMode,
	...props
}: UserAuthFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function onSubmit(event: SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 3000)
	}

	const handleSigninProvider = (provider: OAuthProviderType) => {
		return signIn(provider)
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
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

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>

			{authenticationModes.map(authMode => {
				return (
					<ButtonWithIcon
						key={authMode.mode}
						isLoading={isLoading}
						icon={authMode.icon}
						label={authMode.mode}
						onClick={() => handleSigninProvider(authMode.mode)}
					/>
				)
			})}
		</div>
	)
}

export const authenticationModes: Array<{
	mode: OAuthProviderType
	icon: Icon
}> = [
	{ mode: 'github', icon: GithubIcon },
	{ mode: 'google', icon: GoogleIcon },
]
