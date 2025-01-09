import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateAIContent } from "@/utils/ai";

interface LandingPreviewProps {
  data: {
    hero: string;
    headline: string;
    subheadline: string;
    features: string[];
    about: string;
    products: Array<{
      name: string;
      installments: string;
      cash: string;
    }>;
    commitment: string;
    formHeadline: string;
    formCta: string;
    cta: string;
  };
  onUpdate: (newData: Partial<LandingPreviewProps['data']>) => void;
}

const LandingPreview: React.FC<LandingPreviewProps> = ({ data, onUpdate }) => {
  const [regeneratingField, setRegeneratingField] = useState<string | null>(null);

  const handleRegenerate = async (field: string, currentValue: string) => {
    setRegeneratingField(field);
    try {
      const newContent = await generateAIContent(field, currentValue, data);
      
      if (field === 'features') {
        const featuresArray = newContent.split(',').map(feature => feature.trim());
        onUpdate({ [field]: featuresArray });
      } else if (field === 'products') {
        const productsArray = JSON.parse(newContent);
        onUpdate({ [field]: productsArray });
      } else {
        onUpdate({ [field]: newContent });
      }
      
      toast({
        title: "Sucesso",
        description: `${field} atualizado com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: `Não foi possível atualizar ${field}`,
        variant: "destructive",
      });
    } finally {
      setRegeneratingField(null);
    }
  };

  const RegenerateButton = ({ field, value }: { field: string; value: string }) => (
    <Button
      variant="ghost"
      size="icon"
      className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2"
      onClick={() => handleRegenerate(field, value)}
      disabled={regeneratingField === field}
    >
      {regeneratingField === field ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="h-4 w-4" />
      )}
    </Button>
  );

  // Ensure data.features and data.products have default values
  const features = data.features || [];
  const products = data.products || [];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="relative group text-center py-20 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
        <RegenerateButton field="hero" value={data.hero || ''} />
        <h1 className="text-5xl font-bold mb-4">{data.hero || ''}</h1>
        <h2 className="text-3xl font-semibold mb-4">{data.headline || ''}</h2>
        <p className="text-xl text-muted-foreground">{data.subheadline || ''}</p>
      </section>

      <section className="relative group">
        <RegenerateButton field="about" value={data.about || ''} />
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-center">Sobre Nós</h2>
          <p className="text-lg text-muted-foreground">{data.about || ''}</p>
        </div>
      </section>

      <section className="relative group">
        <RegenerateButton field="features" value={features.join(', ')} />
        <h2 className="text-3xl font-semibold mb-8 text-center">Por Que Escolher a LL Motos?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="relative group">
        <RegenerateButton field="products" value={JSON.stringify(products)} />
        <h2 className="text-3xl font-semibold mb-8 text-center">Ofertas Especiais</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg">12x: R$ {product.installments}</p>
              <p className="text-lg font-semibold text-primary">À vista: R$ {product.cash}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative group">
        <RegenerateButton field="commitment" value={data.commitment || ''} />
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Nosso Compromisso</h2>
          <p className="text-lg text-muted-foreground">{data.commitment || ''}</p>
        </div>
      </section>

      <section className="relative group bg-card p-8 rounded-lg">
        <RegenerateButton field="formHeadline" value={data.formHeadline || ''} />
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">{data.formHeadline || ''}</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Nome" className="w-full p-2 rounded border" />
            <input type="email" placeholder="E-mail" className="w-full p-2 rounded border" />
            <input type="tel" placeholder="WhatsApp" className="w-full p-2 rounded border" />
            <Button size="lg" className="w-full">
              {data.formCta || ''}
            </Button>
          </div>
        </div>
      </section>

      <section className="relative group text-center py-12">
        <RegenerateButton field="cta" value={data.cta || ''} />
        <Button size="lg" className="text-lg px-8">
          {data.cta || ''}
        </Button>
      </section>
    </div>
  );
};

export default LandingPreview;