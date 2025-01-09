import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function generateAIContent(field: string, currentValue: string): Promise<string> {
  try {
    let prompt = "";
    
    if (field === "landing_page") {
      prompt = `Crie uma landing page com o seguinte prompt do usuário: "${currentValue}".
      Retorne apenas um objeto JSON com os seguintes campos:
      {
        "hero": "título principal",
        "headline": "subtítulo",
        "subheadline": "descrição curta",
        "features": ["feature 1", "feature 2", "feature 3"],
        "cta": "texto do botão",
        "about": "texto sobre"
      }`;
    } else {
      prompt = `Você é um especialista em marketing digital. 
      Gere um texto criativo e persuasivo para o campo "${field}" de uma landing page.
      O texto atual é: "${currentValue}".
      Mantenha o tom profissional e adequado ao contexto.
      Responda APENAS com o novo texto, sem explicações adicionais.`;
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
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