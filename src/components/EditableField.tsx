import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onChange }) => {
  const generateAIContent = async () => {
    try {
      // Simula uma chamada à IA - em um ambiente real, isso seria uma chamada à API
      const aiSuggestions = {
        "Headline": "Descubra o Poder da Inovação",
        "Subheadline": "Transforme suas ideias em realidade",
        "CTA": "Comece Agora",
        "Copy": "Nossa plataforma oferece soluções inovadoras para seus desafios",
        "Título": "Experiência Incomparável",
        "Descrição": "Oferecemos o melhor em tecnologia e inovação",
      };

      const newValue = aiSuggestions[label as keyof typeof aiSuggestions] || 
        "Novo conteúdo gerado por IA para " + label;

      onChange(newValue);
      toast({
        title: "Conteúdo atualizado",
        description: "Novo texto gerado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível gerar novo conteúdo",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-4">
      <Label className="block text-sm font-medium text-editor-text mb-1">{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-gray-800 text-editor-text border-gray-700 focus:border-editor-highlight"
        />
        <Button
          onClick={generateAIContent}
          variant="outline"
          size="icon"
          className="bg-gray-800 border-gray-700 hover:bg-gray-700"
          title="Gerar com IA"
        >
          <Wand2 className="h-4 w-4 text-editor-highlight" />
        </Button>
      </div>
    </div>
  );
};

export default EditableField;