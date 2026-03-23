import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CarFormData } from '../../../types';

interface FormFieldsProps {
  register: UseFormRegister<CarFormData>;
  errors: FieldErrors<CarFormData>;
}

export const FormFields: React.FC<FormFieldsProps> = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-brand-yellow uppercase tracking-wider mb-2">Informações Principais</h3>
        
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Marca / Modelo</label>
          <input {...register('marcaModelo')} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none" placeholder="Ex: BMW 320i M Sport" />
          {errors.marcaModelo && <span className="text-xs text-red-500">{errors.marcaModelo.message}</span>}
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Resumo Curto</label>
          <input {...register('resumo')} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none" placeholder="Ex: 2.0 Turbo Automático" />
          {errors.resumo && <span className="text-xs text-red-500">{errors.resumo.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Ano Fab.</label>
            <input type="number" {...register('anoFabricacao', { valueAsNumber: true })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Ano Mod.</label>
            <input type="number" {...register('anoModelo', { valueAsNumber: true })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Preço (R$)</label>
            <input type="number" step="0.01" {...register('preco', { valueAsNumber: true })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white text-lg font-bold text-green-500 focus:border-brand-yellow outline-none" />
            {errors.preco && <span className="text-xs text-red-500">{errors.preco.message}</span>}
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Quilometragem</label>
            <input type="number" {...register('km', { valueAsNumber: true })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-brand-yellow uppercase tracking-wider mb-2">Ficha Técnica</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Câmbio</label>
            <select {...register('cambio')} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none appearance-none cursor-pointer">
              <option value="Automático">Automático</option>
              <option value="Manual">Manual</option>
              <option value="Automatizado">Automatizado</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Combustível</label>
            <select {...register('combustivel')} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none appearance-none cursor-pointer">
              <option value="Flex">Flex</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Etanol">Etanol</option>
              <option value="Diesel">Diesel</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Elétrico">Elétrico</option>
              <option value="GNV">GNV</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Carroceria</label>
            <select {...register('carroceria')} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none appearance-none cursor-pointer">
              <option value="Hatch">Hatch</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Picape">Picape</option>
              <option value="Perua/SW">Perua/SW</option>
              <option value="Minivan">Minivan</option>
              <option value="Esportivo">Esportivo</option>
              <option value="Moto">Moto</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Cor predominante</label>
            <select {...register('cor')} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none appearance-none cursor-pointer">
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Disponibilidade (Status)</label>
            <select {...register('status')} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none font-semibold appearance-none cursor-pointer">
              <option value="DISPONIVEL" className="text-green-500">✅ DISPONÍVEL</option>
              <option value="VENDIDO" className="text-red-500">❌ VENDIDO</option>
              <option value="RESERVADO" className="text-yellow-500">⏳ RESERVADO</option>
              <option value="OCULTO" className="text-zinc-500">👻 OCULTO (Rascunho)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tipo de Veículo</label>
            <select {...register('tipo')} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none font-semibold appearance-none cursor-pointer">
              <option value="CARRO">🚗 Carro</option>
              <option value="MOTO">🏍️ Moto</option>
              <option value="OUTROS">🛸 Outros</option>
            </select>
          </div>
        </div>

        <div>
           <label className="block text-sm text-zinc-400 mb-1">Placa (Opcional - será ocultada se vazia)</label>
           <input {...register('placa')} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-white focus:border-brand-yellow outline-none" placeholder="Ex: ABC-1234" />
        </div>
      </div>
    </div>
  );
};
