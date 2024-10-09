'use client'

import { cn } from '@/lib/cn'
import type { ComponentProps } from 'react'
import { AuthModes } from './auth-modes'
import { MailLogin } from './mail-login'

interface UserAuthFormProps extends ComponentProps<'div'> {
	signMode: 'sign-in' | 'sign-up'
}

export const UserAuthForm = ({
	className,
	signMode,
	...props
}: UserAuthFormProps) => {
	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<MailLogin signMode={signMode} />

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

			<AuthModes />
		</div>
	)
}
