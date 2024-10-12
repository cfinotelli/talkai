'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PopupAssistent } from './_components/popup-assistent'

export default function Home() {
	const router = useRouter()
	const { status } = useSession()

	const isAuthenticated = status === 'authenticated'

	if (!isAuthenticated) {
		return router.push('/authentication')
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-slate-200 w-screen">
			<PopupAssistent />
		</div>
	)
}
