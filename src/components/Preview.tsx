import React from 'react';
import { Card } from "@/components/ui/card";
import Section from './Section';

interface PreviewProps {
  data: any;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  return (
    <Card className="p-6 bg-white rounded-lg overflow-y-auto h-[calc(100vh-2rem)]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Preview</h2>
      {Object.entries(data).map(([key, value], index) => (
        <Section key={index} title={key} content={value} />
      ))}
    </Card>
  );
};

export default Preview;