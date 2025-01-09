import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true // Permitindo uso no navegador
});

export async function generateAIContent(label: string, currentValue: string): Promise<string> {
  try {
    const prompt = `Você é um assistente especializado em marketing digital. 
    Gere um texto criativo e persuasivo para um campo "${label}" de uma landing page.
    O texto atual é: "${currentValue}".
    Mantenha o tom profissional e adequado ao contexto.
    Responda APENAS com o novo texto, sem explicações adicionais.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      stream: false,
      stop: null
    });

    return chatCompletion.choices[0]?.message?.content || 'Erro ao gerar conteúdo';
  } catch (error) {
    console.error('Erro ao gerar conteúdo com IA:', error);
    throw error;
  }
}