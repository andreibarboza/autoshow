import React from 'react';
import { LogOut, Plus } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  openCreateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout, openCreateModal }) => {
  return (
    <header className="h-16 md:h-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-20">
      <div className="flex items-center gap-3">
        <button 
          onClick={onLogout} 
          className="md:hidden p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
          title="Sair do sistema"
        >
          <LogOut className="w-6 h-6" />
        </button>
        <h1 className="text-lg md:text-xl font-semibold hidden sm:block">Gestão de Veículos</h1>
        <span className="text-xl font-bold tracking-tight text-white sm:hidden border border-zinc-700 bg-zinc-800/50 px-3 py-1 rounded-xl">Auto<span className="text-blue-500">Admin</span></span>
      </div>
      
      <button onClick={openCreateModal} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer">
        <Plus className="w-5 h-5 pointer-events-none" />
        <span className="hidden sm:inline">Novo veículo</span>
        <span className="sm:hidden">Novo</span>
      </button>
    </header>
  );
};
