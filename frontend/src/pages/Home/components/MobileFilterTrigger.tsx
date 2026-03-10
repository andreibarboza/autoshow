import React from 'react';
import { Filter } from 'lucide-react';

interface MobileFilterTriggerProps {
  hasFilters: boolean;
  clearFilters: () => void;
  openModal: () => void;
}

export const MobileFilterTrigger: React.FC<MobileFilterTriggerProps> = ({
  hasFilters,
  clearFilters,
  openModal
}) => {
  return (
    <div className="md:hidden flex justify-between items-center px-2 mb-2 w-full">
      {hasFilters ? (
        <button 
          onClick={clearFilters}
          className="text-sm text-zinc-400 hover:text-white underline underline-offset-2 transition-colors active:scale-95"
        >
          Limpar filtros
        </button>
      ) : <div />}
      
      <button 
        onClick={openModal}
        className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl font-bold text-slate-200 active:scale-95 transition-transform"
      >
        <Filter className="w-5 h-5 text-blue-500" />
        Filtros
        {hasFilters && (
          <span className="bg-blue-600 text-white w-2 h-2 rounded-full absolute top-2 right-2"></span>
        )}
      </button>
    </div>
  );
};
