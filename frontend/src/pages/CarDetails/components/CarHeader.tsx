import React from 'react';

interface CarHeaderProps {
  marcaModelo: string;
  status: string;
  resumo: string;
  preco: number;
}

export const CarHeader: React.FC<CarHeaderProps> = ({ marcaModelo, status, resumo, preco }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{marcaModelo}</h1>
          {status === 'VENDIDO' && (
            <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider h-fit">
              Vendido
            </span>
          )}
        </div>
        <p className="text-zinc-400 text-lg md:text-xl">{resumo}</p>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 md:p-6 shrink-0 md:text-right flex flex-row md:flex-col items-center md:items-end justify-between shadow-xl">
        <span className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-1">Preço</span>
        <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          <span className="text-xl md:text-2xl mr-1 text-zinc-500">R$</span>
          {Number(preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};
