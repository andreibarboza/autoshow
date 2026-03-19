import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import type { UseFormSetValue } from 'react-hook-form';
import type { CarFormData } from '../../../types';

interface DescriptionEditorProps {
  value: string;
  setValue: UseFormSetValue<CarFormData>;
}

export const DescriptionEditor: React.FC<DescriptionEditorProps> = ({ value, setValue }) => {
  return (
    <div className="space-y-4 pt-6 border-t border-zinc-800">
      <h3 className="text-sm font-semibold text-brand-yellow uppercase tracking-wider mb-2">Descrição Detalhada</h3>
      <div className="w-full">
        <label className="block text-sm text-zinc-400 mb-2">O que mais os clientes precisam saber sobre este veículo? (Você pode usar Emojis!)</label>
        <div className="bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 text-white editor-dark-theme focus-within:border-brand-yellow transition-colors">
          <style>{`
            .editor-dark-theme .ql-toolbar {
              border: none;
              border-bottom: 1px solid #27272a;
              background-color: #09090b;
            }
            .editor-dark-theme .ql-container {
              border: none;
              min-height: 150px;
              font-size: 16px;
              background-color: #09090b;
            }
            .editor-dark-theme .ql-editor {
              padding: 1rem;
              color: #e2e8f0;
            }
            .editor-dark-theme .ql-editor.ql-blank::before {
              color: #71717a;
              font-style: normal;
            }
            .editor-dark-theme .ql-stroke {
              stroke: #a1a1aa;
            }
            .editor-dark-theme .ql-fill {
              fill: #a1a1aa;
            }
            .editor-dark-theme .ql-picker-label {
              color: #a1a1aa;
            }
          `}</style>
          <ReactQuill 
            theme="snow"
            value={value}
            onChange={(content: string) => setValue('descricao', content)}
            placeholder="Veículo único dono, IPVA pago, revisões na concessionária..."
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }]
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
};
