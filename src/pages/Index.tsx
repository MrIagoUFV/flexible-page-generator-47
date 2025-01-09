import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateAIContent } from "@/utils/ai";
import LandingPreview from "@/components/LandingPreview";

const initialData = {
  "hero": "Bem-vindo à LL Motos",
  "headline": "As Melhores Peças e Manutenções para Sua Moto",
  "subheadline": "Variedade, preços competitivos e condições exclusivas em até 12x sem juros ou desconto à vista",
  "features": [
    "Variedade de Peças",
    "Preços Competitivos",
    "Atendimento Especializado",
    "Manutenção de Qualidade"
  ],
  "about": "Fundada em 2018, a LL Motos nasceu da paixão por motocicletas e pela vontade de oferecer o melhor em peças e manutenção. Nosso objetivo é garantir a segurança, o conforto e a performance da sua moto, sempre com atendimento de qualidade e preços acessíveis.",
  "products": [
    {
      "name": "Óleo 20w50 Mineral Mobil",
      "installments": "33,00",
      "cash": "28,00"
    },
    {
      "name": "Óleo 10w30 Semi sintético Mobil",
      "installments": "38,00",
      "cash": "33,00"
    },
    {
      "name": "Óleo 20w50 Mineral GT",
      "installments": "24,00",
      "cash": "20,00"
    }
  ],
  "commitment": "Nosso compromisso é oferecer produtos e serviços de qualidade para manter sua moto segura, potente e com o melhor custo-benefício. Estamos prontos para atender você com variedade, preços acessíveis e um atendimento personalizado.",
  "formHeadline": "Garanta o Melhor para Sua Moto!",
  "formCta": "Solicitar Orçamento",
  "cta": "Aproveite as Ofertas Agora"
};

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [landingData, setLandingData] = useState(initialData);
  const [currentSection, setCurrentSection] = useState<string>("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma descrição para sua landing page",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const sections = ['hero', 'headline', 'subheadline', 'features', 'about', 'products', 'commitment', 'formHeadline', 'formCta', 'cta'];
    const newData = { ...landingData };

    try {
      for (const section of sections) {
        setCurrentSection(section);
        const newContent = await generateAIContent(section, prompt);
        
        if (section === 'features') {
          newData[section] = newContent.split(',').map(feature => feature.trim());
        } else if (section === 'products') {
          newData[section] = JSON.parse(newContent);
        } else {
          newData[section] = newContent;
        }
      }

      setLandingData(newData);
      toast({
        title: "Sucesso",
        description: "Landing page gerada com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível gerar a landing page",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      setCurrentSection("");
    }
  };

  const handleUpdate = (newData: Partial<typeof landingData>) => {
    setLandingData(prev => ({
      ...prev,
      ...newData
    }));
  };

  return (
    <div className="min-h-screen bg-background relative">
      {isGenerating && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p className="text-lg font-medium">Gerando {currentSection}...</p>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex gap-2">
          <Textarea
            placeholder="Descreva a landing page que deseja criar"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 min-h-[100px]"
          />
          <Button
            onClick={handleGenerate}
            variant="outline"
            size="icon"
            disabled={isGenerating}
            className="h-auto"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
          </Button>
        </div>
        <LandingPreview data={landingData} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default Index;