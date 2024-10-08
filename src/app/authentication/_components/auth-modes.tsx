import type { Icon } from '@/@types/elements'
import { GithubIcon, GoogleIcon } from '@/assets/icons'
import { ButtonWithIcon } from '@/components/button-with-icon'
import type { OAuthProviderType } from 'next-auth/providers/oauth-types'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export const AuthModes = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function handleSigninProvider(provider: OAuthProviderType) {
		setIsLoading(true)

		try {
			await signIn(provider)
		} catch (error) {
			console.error(error)
		}

		setIsLoading(false)
	}

	return (
		<>
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
		</>
	)
}

export const authenticationModes: Array<{
	mode: OAuthProviderType
	icon: Icon
}> = [
	{ mode: 'github', icon: GithubIcon },
	{ mode: 'google', icon: GoogleIcon },
]
