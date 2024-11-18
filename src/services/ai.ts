import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const ai = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY);

const aiFileManager = new GoogleAIFileManager(process.env.GEMINIAI_API_KEY);

export { ai, aiFileManager };

