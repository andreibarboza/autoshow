import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, LogOut, Settings } from 'lucide-react';

interface SidebarProps {
  userEmail: string | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ userEmail, onLogout }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex-col hidden md:flex sticky top-0 h-screen">
      <div className="h-20 flex items-center px-6 border-b border-zinc-800">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Auto<span className="text-blue-500">Admin</span></span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-500 font-medium rounded-xl border border-blue-500/20">
          <Car className="w-5 h-5" />
          Catálogo
        </button>
        <button disabled className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 font-medium rounded-xl opacity-50 cursor-not-allowed">
          <Settings className="w-5 h-5" />
          Configurações
        </button>
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-zinc-400">{userEmail?.charAt(0).toUpperCase() || 'A'}</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-slate-200 truncate">{userEmail || 'Admin'}</p>
            <p className="text-xs text-zinc-500">Administrador</p>
          </div>
        </div>
        <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold rounded-xl transition-colors cursor-pointer">
          <LogOut className="w-5 h-5" />
          Sair do sistema
        </button>
      </div>
    </aside>
  );
};
