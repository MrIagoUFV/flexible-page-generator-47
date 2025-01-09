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
    cta: string;
    about: string;
  };
}

const LandingPreview: React.FC<LandingPreviewProps> = ({ data }) => {
  const [regeneratingField, setRegeneratingField] = useState<string | null>(null);

  const handleRegenerate = async (field: string, currentValue: string) => {
    setRegeneratingField(field);
    try {
      const newContent = await generateAIContent(field, currentValue);
      // TODO: Update the specific field in the parent component
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

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="relative group text-center py-20 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
        <RegenerateButton field="hero" value={data.hero} />
        <h1 className="text-5xl font-bold mb-4">{data.hero}</h1>
        <h2 className="text-3xl font-semibold mb-4">{data.headline}</h2>
        <p className="text-xl text-muted-foreground">{data.subheadline}</p>
      </section>

      <section className="relative group">
        <RegenerateButton field="features" value={data.features.join(', ')} />
        <div className="grid md:grid-cols-3 gap-8">
          {data.features.map((feature, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="relative group text-center py-12">
        <RegenerateButton field="about" value={data.about} />
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-muted-foreground">{data.about}</p>
        </div>
      </section>

      <section className="relative group text-center py-12">
        <RegenerateButton field="cta" value={data.cta} />
        <Button size="lg" className="text-lg px-8">
          {data.cta}
        </Button>
      </section>
    </div>
  );
};

export default LandingPreview;