import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EditableField from './EditableField';

interface JsonEditorProps {
  data: any;
  onUpdate: (newData: any) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ data, onUpdate }) => {
  const handleFieldUpdate = (path: string[], value: string) => {
    const newData = { ...data };
    let current = newData;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    
    onUpdate(newData);
  };

  const renderObject = (obj: any, path: string[] = []) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <div key={key} className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-editor-text">{key}</h3>
            <div className="pl-4">
              {renderObject(value, [...path, key])}
            </div>
          </div>
        );
      } else if (Array.isArray(value)) {
        return (
          <div key={key} className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-editor-text">{key}</h3>
            <div className="pl-4">
              {value.map((item, index) => (
                <div key={index} className="mb-2">
                  {renderObject(item, [...path, key, index.toString()])}
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <EditableField
            key={key}
            label={key}
            value={value as string}
            onChange={(newValue) => handleFieldUpdate([...path, key], newValue)}
          />
        );
      }
    });
  };

  return (
    <Card className="p-6 bg-editor-bg rounded-lg overflow-y-auto h-[calc(100vh-2rem)]">
      <h2 className="text-2xl font-bold mb-6 text-editor-highlight">Editor de Conteúdo</h2>
      {renderObject(data)}
    </Card>
  );
};

export default JsonEditor;