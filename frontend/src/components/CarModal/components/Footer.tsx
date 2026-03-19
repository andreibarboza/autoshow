import React from 'react';
import { Loader2 } from 'lucide-react';

interface FooterProps {
  onClose: () => void;
  isPending: boolean;
  isEditing: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onClose, isPending, isEditing }) => {
  return (
    <div className="p-6 border-t border-zinc-800 bg-zinc-950 flex items-center justify-end gap-4 shrink-0">
      <button type="button" onClick={onClose} disabled={isPending} className="px-5 py-2.5 text-zinc-400 font-medium hover:text-white transition-colors cursor-pointer">
        Cancelar
      </button>
      <button 
        type="submit" 
        form="car-form" 
        disabled={isPending}
        className="bg-brand-yellow hover:bg-brand-yellow-hover disabled:opacity-50 text-zinc-950 px-8 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 cursor-pointer"
      >
        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {isEditing ? 'Salvar edição' : 'Publicar veículo'}
      </button>
    </div>
  );
};
