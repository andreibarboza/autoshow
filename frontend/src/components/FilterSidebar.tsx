import React from 'react';
import { Search } from 'lucide-react';
import type { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClear: () => void;
}

const FilterSidebar = ({ filters, setFilters, onClear }: FilterSidebarProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      hasFilters: true
    }));
  };

  return (
    <aside className="w-full md:w-72 bg-zinc-900 border border-zinc-800 rounded-2xl rounded-r-none p-6 h-fit sticky top-28 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          Filtros
        </h3>
        {filters.hasFilters && (
          <button 
            onClick={onClear}
            className="text-xs text-zinc-400 hover:text-white underline underline-offset-2 transition-colors"
          >
            Limpar todos
          </button>
        )}
      </div>

      <div className="space-y-6">
        
        <div className="pb-6 border-b border-zinc-800/60">
          <label className="block text-sm font-medium text-zinc-400 mb-2">Busca</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input 
              name="search"
              value={filters.search}
              onChange={handleChange}
              type="text" 
              placeholder="Marca, modelo..." 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-9 pr-3 text-slate-200 focus:outline-none focus:border-brand-yellow/50 transition-colors text-sm"
            />
          </div>
        </div>

        <div className="pb-6 border-b border-zinc-800/60">
          <label className="block text-sm font-medium text-zinc-400 mb-2">Tipo de Veículo</label>
          <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
            {['TODOS', 'CARRO', 'MOTO'].map((t) => (
              <button
                key={t}
                onClick={() => setFilters(prev => ({ ...prev, tipo: t === 'TODOS' ? '' : t, hasFilters: true }))}
                className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  (filters.tipo === t || (t === 'TODOS' && !filters.tipo)) 
                    ? 'bg-zinc-800 text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                {t === 'TODOS' ? 'Todos' : t === 'CARRO' ? 'Carros' : 'Motos'}
              </button>
            ))}
          </div>
        </div>

        <div className="pb-6 border-b border-zinc-800/60">
          <label className="block text-sm font-medium text-zinc-400 mb-2">Preço (R$)</label>
          <div className="flex gap-2">
            <input 
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              type="number" 
              placeholder="Mín" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-3 text-slate-200 focus:outline-none focus:border-brand-yellow/50 transition-colors text-sm"
            />
            <input 
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              type="number" 
              placeholder="Máx" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-3 text-slate-200 focus:outline-none focus:border-brand-yellow/50 transition-colors text-sm"
            />
          </div>
        </div>

        <div className="pb-6 border-b border-zinc-800/60">
          <label className="block text-sm font-medium text-zinc-400 mb-2">Ano mínimo</label>
          <div className="flex gap-2">
             <input 
              name="minYear"
              value={filters.minYear}
              onChange={handleChange}
              type="number" 
              placeholder="Ex: 2015" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-3 text-slate-200 focus:outline-none focus:border-brand-yellow/50 transition-colors text-sm"
            />
          </div>
        </div>

        <div className="pb-2">
          <label className="block text-sm font-medium text-zinc-400 mb-2">Cor</label>
          <select 
            name="color"
            value={filters.color}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-3 text-slate-200 focus:outline-none focus:border-brand-yellow/50 transition-colors text-sm appearance-none"
          >
            <option value="">Todas as cores</option>
            <option value="Branco">Branco</option>
            <option value="Preto">Preto</option>
            <option value="Prata">Prata</option>
            <option value="Cinza">Cinza</option>
            <option value="Vermelho">Vermelho</option>
            <option value="Azul">Azul</option>
            <option value="Marrom">Marrom</option>
            <option value="Verde">Verde</option>
            <option value="Amarelo">Amarelo</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

      </div>
    </aside>
  );
};

export default FilterSidebar;
