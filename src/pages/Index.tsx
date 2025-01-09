import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateAIContent } from "@/utils/ai";
import LandingPreview from "@/components/LandingPreview";

const initialData = {
  "hero": "Bem-vindo ao Futuro",
  "headline": "Transforme suas Ideias em Realidade",
  "subheadline": "Uma plataforma inovadora para criar landing pages incríveis",
  "features": [
    "Design Intuitivo",
    "Personalização Total",
    "Resultados Rápidos"
  ],
  "cta": "Comece Agora",
  "about": "Somos uma empresa dedicada a transformar a maneira como você cria landing pages."
};

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [landingData, setLandingData] = useState(initialData);

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
    try {
      const newContent = await generateAIContent("landing_page", prompt);
      const parsedContent = JSON.parse(newContent);
      setLandingData(parsedContent);
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
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex gap-2">
          <Input
            placeholder="Descreva a landing page que deseja criar"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleGenerate}
            variant="outline"
            size="icon"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
          </Button>
        </div>
        <LandingPreview data={landingData} />
      </div>
    </div>
  );
};

export default Index;