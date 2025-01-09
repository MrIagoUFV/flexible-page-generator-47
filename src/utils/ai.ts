import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function generateAIContent(field: string, currentValue: string, fullContext?: any): Promise<string> {
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
        "about": "texto sobre a empresa",
        "products": [
          {
            "name": "nome do produto",
            "installments": "valor em 12x",
            "cash": "valor à vista"
          }
        ],
        "commitment": "texto de compromisso",
        "formHeadline": "título do formulário",
        "formCta": "texto do botão do formulário",
        "cta": "texto do botão principal"
      }`;
    } else {
      const contextDescription = fullContext ? `
        Contexto atual da landing page:
        - Hero: ${fullContext.hero}
        - Headline: ${fullContext.headline}
        - Subheadline: ${fullContext.subheadline}
        - Features: ${fullContext.features?.join(', ')}
        - About: ${fullContext.about}
        - Products: ${JSON.stringify(fullContext.products)}
        - Commitment: ${fullContext.commitment}
        - Form Headline: ${fullContext.formHeadline}
        - Form CTA: ${fullContext.formCta}
        - CTA: ${fullContext.cta}
      ` : '';

      prompt = `Você é um especialista em marketing digital. 
      ${contextDescription}
      
      Com base no contexto acima, gere um novo texto criativo e persuasivo APENAS para o campo "${field}".
      O texto atual deste campo é: "${currentValue}".
      
      Mantenha o tom profissional e coerente com o resto da página.
      Responda APENAS com o novo texto para este campo específico, sem explicações adicionais.`;
    }

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 32000, // Reduced to be within the model's limit
      top_p: 1,
      stream: false,
      stop: null
    });

    const content = completion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content generated');
    }

    return content;
  } catch (error) {
    console.error('Erro ao gerar conteúdo com IA:', error);
    throw error;
  }
}