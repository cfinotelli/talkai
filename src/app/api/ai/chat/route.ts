import { ai, aiFileManager } from "@/services/ai";
import { z } from "zod";

import contextChat from "@/data/context.txt";

export async function POST(request: Request) {
  const schema = z.object({
    prompt: z.string().min(1, 'Please enter a prompt.'),
  });

  const data = await request.json()

  try {
    const { prompt } = schema.parse(data);

    console.log({ prompt })

    const sendPromptFormated = `Seja profissional, esse chat trata-se de atendimento a clientes de um chaveiro: esta é a mensagem do usuario '${prompt}', pesquise dentro do documento e se ]não tiver a resposta ou se a pergunta n'ao for relacionada retorne somente: 'Por favor, tem alguma duvida quanto aos serviços de chaveiro?', formate bem o contexto de sua resposta de forma clara e direto ao ponto, n'ao envie respostas grandes.`

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const uploadResult = await aiFileManager.uploadFile(contextChat, {
      mimeType: "text/plain",
      displayName: "context-chat"
    });

    console.log(
      `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
    );

    const result = await model.generateContent([
      sendPromptFormated,
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    const assistentMessage = result.response.text()

    console.log({ assistentMessage })

    return new Response(JSON.stringify({ assistentMessage }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 400 });
  }
}