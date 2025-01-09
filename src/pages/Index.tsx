import React, { useState } from 'react';
import JsonEditor from '@/components/JsonEditor';
import Preview from '@/components/Preview';
import { toast } from "@/components/ui/use-toast";

const initialData = {
  "Landing Page": "Nome do Projeto",
  "Seção 1": {
    "Hero": "Resumo da Seção",
    "Headline": "Título Principal",
    "Subheadline": "Descrição resumida da seção.",
    "CTA": "Call to Action (Ex: Clique Aqui)"
  },
  "Seção 2": {
    "Sobre": {
      "Headline": "Título da Seção",
      "Copy": "Texto descritivo sobre a seção."
    }
  },
  "Seção 3": {
    "Benefícios": {
      "Headline": "Por que Escolher?",
      "Copy em Lista de Benefícios": [
        {
          "Título": "Título do Benefício 1",
          "Descrição": "Descrição breve do benefício."
        },
        {
          "Título": "Título do Benefício 2",
          "Descrição": "Descrição breve do benefício."
        }
      ]
    }
  },
  "Seção 4": {
    "Serviços": {
      "Headline": "Título da Seção",
      "Copy com Destaque de Serviços": [
        {
          "Título": "Nome do Serviço 1",
          "Descrição": "Descrição do serviço 1."
        },
        {
          "Título": "Nome do Serviço 2",
          "Descrição": "Descrição do serviço 2."
        }
      ]
    }
  },
  "Seção 5": {
    "Formulário": {
      "Headline": "Título da Seção",
      "Campos": {
        "Campo1": "",
        "Campo2": ""
      },
      "CTA": "Botão de Envio",
      "Copy": "Texto de incentivo para o formulário."
    }
  }
};

const Index = () => {
  const [data, setData] = useState(initialData);

  const handleUpdate = (newData: any) => {
    setData(newData);
    toast({
      title: "Conteúdo atualizado",
      description: "As alterações foram aplicadas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
        <JsonEditor data={data} onUpdate={handleUpdate} />
        <Preview data={data} />
      </div>
    </div>
  );
};

export default Index;