import React from 'react';
import { X } from 'lucide-react';

interface HeaderProps {
  isEditing: boolean;
  onClose: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isEditing, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-zinc-800">
      <h2 className="text-xl font-bold">{isEditing ? 'Editar veículo' : 'Cadastrar novo veículo'}</h2>
      <button onClick={onClose} type="button" className="p-2 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
