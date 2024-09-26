import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { LayoutProviders } from './modules/layout-providers'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'TalkAi',
	description:
		'Fale e conecte-se, converse com quem quiser e tambem com a IA.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<LayoutProviders>{children}</LayoutProviders>
			</body>
		</html>
	)
}
