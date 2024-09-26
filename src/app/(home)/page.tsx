'use client'

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()
	const { data, status } = useSession()

	const isAuthenticated = status === 'authenticated'

	if (!isAuthenticated) {
		return router.push('/authentication')
	}

	const user = data.user

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col gap-2 items-center justify-center">
				<Image
					alt={user?.name as string}
					src={user?.image as string}
					width={60}
					height={60}
					sizes="100%"
					className="rounded-full border-orange-400 border-2 border-solid p-0.5"
				/>
				<h1>Seja bem vindo {user?.name}</h1>
				<Button onClick={() => signOut()}>sair</Button>
			</div>
		</div>
	)
}
