import React from 'react';

interface SectionProps {
  title: string;
  content: any;
}

const Section: React.FC<SectionProps> = ({ title, content }) => {
  const renderContent = (content: any) => {
    if (typeof content === 'string') {
      return <p className="text-gray-600">{content}</p>;
    }

    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-5">
          {content.map((item, index) => (
            <li key={index} className="mb-2">
              {renderContent(item)}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof content === 'object' && content !== null) {
      return (
        <div className="pl-4">
          {Object.entries(content).map(([key, value], index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold mb-2">{key}</h4>
              {renderContent(value)}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mb-8 p-4 border border-gray-200 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      {renderContent(content)}
    </div>
  );
};

export default Section;