import type { Icon } from '@/@types/elements'
import type { ComponentProps } from 'react'
import { LoadingSpin } from './loading-spin'
import { Button } from './ui/button'

interface ButtonWithIconProps extends ComponentProps<'button'> {
	isLoading: boolean
	icon: Icon
	label: string
}

export const ButtonWithIcon = ({
	isLoading,
	icon: Icon,
	label,
	...props
}: ButtonWithIconProps) => {
	return (
		<Button
			{...props}
			variant="outline"
			type="button"
			disabled={isLoading}
			className="flex items-center justify-center gap-2 capitalize"
		>
			{isLoading ? <LoadingSpin /> : <Icon className="mr-2 h-4 w-4" />}
			{label}
		</Button>
	)
}
