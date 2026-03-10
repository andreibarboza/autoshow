import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car as CarIcon, Fuel, Calendar, Gauge } from 'lucide-react';
import type { Car } from '../../../types';

interface CarCardProps {
  car: Car;
  index: number;
  isUnavailableAndUnfiltered: boolean;
}

export const CarCard: React.FC<CarCardProps> = ({ car, index, isUnavailableAndUnfiltered }) => {
  const CardWrapper = car.status === 'DISPONIVEL' ? Link : 'div';
  const wrapperProps = car.status === 'DISPONIVEL' ? { to: `/car/${car.id}` } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      key={car.id}
    >
      <CardWrapper
        {...wrapperProps as any}
        className={`h-full block bg-zinc-900/80 border border-zinc-800/80 rounded-3xl overflow-hidden hover:border-zinc-700 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 group ${car.status === 'DISPONIVEL' ? 'cursor-pointer' : 'cursor-default'} backdrop-blur-sm flex flex-col items-start 
          ${isUnavailableAndUnfiltered ? 'opacity-50 hover:opacity-100 grayscale-[0.3]' : ''}
        `}
      >
      
      <div className="relative w-full aspect-[4/3] md:aspect-video bg-zinc-950 overflow-hidden shrink-0">
        {car.fotos && car.fotos.length > 0 ? (
          <img
            src={car.fotos.find(f => f.isMain)?.url || car.fotos[0].url}
            alt={car.marcaModelo}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-zinc-900">
            <CarIcon className="w-12 h-12" />
          </div>
        )}
        {car.status === 'VENDIDO' && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
            Vendido
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="bg-zinc-950/90 backdrop-blur-md text-white font-bold py-2 px-4 rounded-xl border border-white/5 shadow-xl">
            <span className="text-zinc-400 text-xs font-medium mr-1 tracking-wider uppercase">R$</span>
            <span className="text-xl tracking-tight">{Number(car.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      <div className="p-6 w-full grow flex flex-col justify-between items-start">
        <div className="w-full">
          <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-blue-400 transition-colors line-clamp-1 w-full">
            {car.marcaModelo}
          </h3>
          <p className="text-sm text-zinc-400 mb-6 line-clamp-1">{car.resumo}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:gap-4 text-sm font-medium text-zinc-300 w-full">
          <div className="flex w-full items-center gap-2.5 bg-zinc-950/50 py-2 px-3 rounded-lg border border-zinc-800/50">
            <Calendar className="w-4 h-4 text-zinc-500 shrink-0" />
            <span className="truncate">{car.anoFabricacao}/{car.anoModelo}</span>
          </div>
          <div className="flex w-full items-center gap-2.5 bg-zinc-950/50 py-2 px-3 rounded-lg border border-zinc-800/50">
            <Gauge className="w-4 h-4 text-zinc-500 shrink-0" />
            <span className="truncate">{car.km.toLocaleString('pt-BR')} km</span>
          </div>
          <div className="flex w-full items-center gap-2.5 bg-zinc-950/50 py-2 px-3 rounded-lg border border-zinc-800/50">
            <Fuel className="w-4 h-4 text-zinc-500 shrink-0" />
            <span className="truncate">{car.combustivel}</span>
          </div>
          <div className="flex w-full items-center gap-2.5 bg-zinc-950/50 py-2 px-3 rounded-lg border border-zinc-800/50">
            <div className="w-4 h-4 rounded-full border border-zinc-700 flex items-center justify-center p-0.5 shadow-inner bg-zinc-900 shrink-0">
              <div
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: ({
                    'branco': '#fff',
                    'preto': '#111',
                    'prata': '#94a3b8',
                    'cinza': '#64748b',
                    'vermelho': '#ef4444',
                    'azul': '#3b82f6',
                    'marrom': '#78350f',
                    'verde': '#22c55e',
                    'amarelo': '#eab308',
                    'outros': '#a8a29e'
                  }[car.cor.toLowerCase()] || '#3b82f6')
                }}
              />
            </div>
            <span className="capitalize text-ellipsis overflow-hidden whitespace-nowrap">{car.cor}</span>
          </div>
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  );
};
