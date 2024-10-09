'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CopyrightSection } from './_components/copyright-section'
import { SignMode } from './_components/sign-mode'
import { UserAuthForm } from './_components/user-auth-form'

const Authentication = () => {
	const router = useRouter()
	const { status } = useSession()

	const isAuthenticated = status === 'authenticated'

	if (isAuthenticated) {
		return router.push('/')
	}

	return (
		<div className="container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<SignMode formChildren={<UserAuthForm />} />

			<CopyrightSection />
		</div>
	)
}

export default Authentication
