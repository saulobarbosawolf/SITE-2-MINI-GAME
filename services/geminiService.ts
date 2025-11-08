
import { GoogleGenAI, Type } from "@google/genai";
import { TopicContent } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    educationalText: {
      type: Type.STRING,
      description: "Um texto educacional com 3-4 parágrafos sobre o tópico."
    },
    quizQuestions: {
      type: Type.ARRAY,
      description: "Uma lista de 3 questões de múltipla escolha.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.STRING }
        },
        required: ["question", "options", "correctAnswer"]
      }
    }
  },
  required: ["educationalText", "quizQuestions"]
};


export const getTopicContent = async (topicTitle: string): Promise<TopicContent> => {
  try {
    const prompt = `Você é um especialista em IoT (Internet das Coisas) criando um minijogo educacional.
Para o tópico "${topicTitle}", por favor, gere o seguinte conteúdo em formato JSON:
1.  Um texto educacional chamado 'educationalText', com 3-4 parágrafos, explicando o tópico de forma clara e concisa para iniciantes em português do Brasil.
2.  Um array de 3 questões de múltipla escolha chamado 'quizQuestions'. Cada questão deve ter:
    - uma 'question' (string)
    - um array de 'options' (array de strings) com 4 opções.
    - um 'correctAnswer' (string) que seja exatamente igual a uma das opções.

Responda apenas com o JSON.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    return data as TopicContent;

  } catch (error) {
    console.error("Error fetching topic content from Gemini:", error);
    // Fallback in case of API error
    return {
      educationalText: "Ocorreu um erro ao carregar o conteúdo. Por favor, tente novamente mais tarde.",
      quizQuestions: []
    };
  }
};

export const getRewardMessage = async (): Promise<string> => {
  try {
    const prompt = "Gere uma mensagem curta e motivacional de parabéns para um usuário que completou com sucesso um quiz sobre IoT em um jogo. A mensagem deve celebrar a conquista e mencionar que ele alcançou o nível 'Especialista em Cidades Inteligentes'. Fale em português do Brasil.";
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching reward message from Gemini:", error);
    return "Parabéns! Você completou a jornada e demonstrou um grande conhecimento em IoT. Você é um verdadeiro especialista em Cidades Inteligentes!";
  }
};
