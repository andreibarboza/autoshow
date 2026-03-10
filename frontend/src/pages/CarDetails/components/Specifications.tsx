import React from 'react';
import { Calendar, Gauge, Fuel, CheckCircle2 } from 'lucide-react';
import type { Car } from '../../../types';

interface SpecificationsProps {
  car: Car;
}

export const Specifications: React.FC<SpecificationsProps> = ({ car }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-blue-500" /> Ficha Técnica Completa
      </h3>

      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Ano Fab/Mod</p>
          <p className="font-semibold">{car.anoFabricacao}/{car.anoModelo}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5"><Gauge className="w-4 h-4" /> Quilometragem</p>
          <p className="font-semibold">{car.km.toLocaleString('pt-BR')} km</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5"><Fuel className="w-4 h-4" /> Combustível</p>
          <p className="font-semibold">{car.combustivel}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5"> Câmbio</p>
          <p className="font-semibold">{car.cambio}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5"> Carroceria</p>
          <p className="font-semibold">{car.carroceria}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5"> Cor</p>
          <p className="font-semibold capitalize">{car.cor}</p>
        </div>
        {car.placa && (
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5"> Placa</p>
            <p className="font-semibold">{car.placa}</p>
          </div>
        )}
      </div>
    </div>
  );
};
