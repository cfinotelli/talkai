export async function sendRequestChatMessage(prompt: string): Promise<{
	assistentMessage: string
}> {
	const response = await fetch('api/ai/chat', {
		method: 'POST',
		body: JSON.stringify({ prompt }),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const { assistentMessage } = await response.json()

	return { assistentMessage }
}
