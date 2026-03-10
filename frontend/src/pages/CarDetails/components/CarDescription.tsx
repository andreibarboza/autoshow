import React from 'react';

interface CarDescriptionProps {
  descricao: string;
}

export const CarDescription: React.FC<CarDescriptionProps> = ({ descricao }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl">
      <h3 className="text-lg font-bold mb-4">Sobre o Veículo</h3>
      <div className="custom-html-content text-zinc-400 leading-relaxed text-sm md:text-base">
        <style>{`
          .custom-html-content ul {
            list-style-type: disc;
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }
          .custom-html-content ol {
            list-style-type: decimal;
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }
          .custom-html-content li {
            margin-bottom: 0.5rem;
          }
          .custom-html-content p {
            margin-bottom: 1rem;
          }
          .custom-html-content p:last-child {
            margin-bottom: 0;
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: descricao }} />
      </div>
    </div>
  );
};
