import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <Label className="block text-sm font-medium text-editor-text mb-1">{label}</Label>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 text-editor-text border-gray-700 focus:border-editor-highlight"
      />
    </div>
  );
};

export default EditableField;