import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateAIContent } from "@/utils/ai";

interface Product {
  name: string;
  installments: string;
  cash: string;
}

interface LandingPreviewProps {
  data: {
    hero: string;
    headline: string;
    subheadline: string;
    features: string[];
    about: string;
    products: Product[];
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
        try {
          const productsArray = JSON.parse(newContent);
          if (Array.isArray(productsArray)) {
            onUpdate({ [field]: productsArray });
          } else {
            throw new Error('Products must be an array');
          }
        } catch (error) {
          console.error('Failed to parse products:', error);
          toast({
            title: "Erro",
            description: "Formato inválido para produtos",
            variant: "destructive",
          });
        }
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

  // Ensure data properties have default values
  const features = Array.isArray(data.features) ? data.features : [];
  const products = Array.isArray(data.products) ? data.products : [];
  const hero = data.hero || '';
  const headline = data.headline || '';
  const subheadline = data.subheadline || '';
  const about = data.about || '';
  const commitment = data.commitment || '';
  const formHeadline = data.formHeadline || '';
  const formCta = data.formCta || '';
  const cta = data.cta || '';

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="relative group text-center py-20 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
        <RegenerateButton field="hero" value={hero} />
        <h1 className="text-5xl font-bold mb-4">{hero}</h1>
        <h2 className="text-3xl font-semibold mb-4">{headline}</h2>
        <p className="text-xl text-muted-foreground">{subheadline}</p>
      </section>

      <section className="relative group">
        <RegenerateButton field="about" value={about} />
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-center">Sobre Nós</h2>
          <p className="text-lg text-muted-foreground">{about}</p>
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
        <RegenerateButton field="commitment" value={commitment} />
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Nosso Compromisso</h2>
          <p className="text-lg text-muted-foreground">{commitment}</p>
        </div>
      </section>

      <section className="relative group bg-card p-8 rounded-lg">
        <RegenerateButton field="formHeadline" value={formHeadline} />
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">{formHeadline}</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Nome" className="w-full p-2 rounded border" />
            <input type="email" placeholder="E-mail" className="w-full p-2 rounded border" />
            <input type="tel" placeholder="WhatsApp" className="w-full p-2 rounded border" />
            <Button size="lg" className="w-full">
              {formCta}
            </Button>
          </div>
        </div>
      </section>

      <section className="relative group text-center py-12">
        <RegenerateButton field="cta" value={cta} />
        <Button size="lg" className="text-lg px-8">
          {cta}
        </Button>
      </section>
    </div>
  );
};

export default LandingPreview;