import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateAIContent } from "@/utils/ai";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateContent = async () => {
    setIsLoading(true);
    try {
      const newContent = await generateAIContent(label, value);
      onChange(newContent);
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
    } finally {
      setIsLoading(false);
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
          onClick={handleGenerateContent}
          variant="outline"
          size="icon"
          className="bg-gray-800 border-gray-700 hover:bg-gray-700"
          title="Gerar com IA"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-editor-highlight animate-spin" />
          ) : (
            <Wand2 className="h-4 w-4 text-editor-highlight" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditableField;