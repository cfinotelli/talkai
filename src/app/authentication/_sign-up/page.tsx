interface SignInProps {
	formChildren: React.ReactNode
}

export const SignUp = ({ formChildren }: SignInProps) => {
	return (
		<div className="flex items-center justify-center h-full">
			<div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Crie sua conta
					</h1>
					<p className="text-sm text-muted-foreground">
						Informe o seu melhor e-mail para criar sua conta
					</p>
				</div>
				{formChildren}
			</div>
		</div>
	)
}
