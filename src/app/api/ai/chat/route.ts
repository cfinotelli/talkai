import { ai } from "@/services/ai";
import { z } from "zod";

export async function POST(request: Request) {
  const schema = z.object({
    prompt: z.string().min(1, 'Please enter a prompt.'),
  });

  const data = await request.json()

  console.log({ data: data })

  try {
    const { prompt } = schema.parse(data);

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    const assistentMessage = result.response.text()

    console.log({ messageAssistent: assistentMessage })

    return new Response(JSON.stringify({ assistentMessage }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 400 });
  }
}