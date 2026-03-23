import React from 'react';
import { X } from 'lucide-react';
import FilterSidebar from '../../../components/FilterSidebar';
import type { FilterState } from '../../../types';

interface MobileFilterModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearFilters: () => void;
  resultCount: number;
}

export const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
  isOpen,
  setIsOpen,
  filters,
  setFilters,
  clearFilters,
  resultCount
}) => {
  return (
    <div className={`
      fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl p-4 overflow-y-auto flex-col h-screen
      md:sticky md:top-32 md:h-fit md:bg-transparent md:backdrop-blur-none md:p-0 md:flex md:w-auto md:shrink-0 md:self-start
      [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-zinc-900/50 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600
      ${isOpen ? 'flex' : 'hidden'}
    `}>
      <div className="md:hidden flex justify-between items-center mb-6 pt-4 px-2">
        <h2 className="text-xl font-bold flex items-center gap-2">Filtros</h2>
        <button onClick={() => setIsOpen(false)} className="bg-zinc-800 p-2 rounded-full group cursor-pointer">
          <X className="w-5 h-5 text-zinc-400 group-hover:text-white" />
        </button>
      </div>
      <FilterSidebar filters={filters} setFilters={setFilters} onClear={clearFilters} />
      
      <div className="md:hidden mt-8 mb-4 px-2">
        <button onClick={() => setIsOpen(false)} className="w-full bg-brand-yellow font-bold py-4 rounded-xl text-zinc-950">
          Ver Resultados ({resultCount})
        </button>
      </div>
    </div>
  );
};
