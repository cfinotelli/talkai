'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import type { ReactNode } from 'react'

interface LayoutProvidersProps {
	children: ReactNode
}

export const LayoutProviders = ({ children }: LayoutProvidersProps) => {
	return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
