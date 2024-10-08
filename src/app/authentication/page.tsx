'use client'

import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CopyrightSection } from './_components/copyright-section'
import { SignMode } from './_components/sign-mode'
import { UserAuthForm } from './_components/user-auth-form'

const Authentication = () => {
	const router = useRouter()
	const { status } = useSession()
	const [currentSignMode, setCurrentSignMode] = useState<
		'sign-in' | 'sign-up'
	>('sign-up')

	const isAuthenticated = status === 'authenticated'

	if (isAuthenticated) {
		return router.push('/')
	}

	const handleToggleSignMode = () => {
		setCurrentSignMode(currentSignMode === 'sign-in' ? 'sign-up' : 'sign-in')
	}

	return (
		<div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<Button
				className="absolute left-4 top-4 md:left-8 md:top-8"
				variant="outline"
				onClick={handleToggleSignMode}
			>
				{currentSignMode === 'sign-in' ? 'Registrar-se' : 'Entrar'}
			</Button>

			<SignMode
				signMode={currentSignMode}
				formChildren={<UserAuthForm signMode={currentSignMode} />}
			/>

			<CopyrightSection />
		</div>
	)
}

export default Authentication
