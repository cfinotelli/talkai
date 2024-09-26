'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()
	const { data, status } = useSession()

	const isAuthenticated = status === 'authenticated'

	if (!isAuthenticated) {
		return router.push('/authentication')
	}

	const user = data.user?.name

	return (
		<div className="flex items-center justify-center min-h-screen">
			<h1>Seja bem vindo {user}</h1>
		</div>
	)
}
