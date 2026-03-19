import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { Car, Edit2, Trash2, Calendar, Gauge, Fuel, GripVertical } from 'lucide-react';
import type { Car as CarType } from '../../../types';

interface CarsTableProps {
  cars: CarType[] | undefined;
  isLoading: boolean;
  handleDragEnd: (result: DropResult) => void;
  openEditModal: (car: CarType) => void;
  handleDelete: (id: string) => void;
}

export const CarsTable: React.FC<CarsTableProps> = ({
  cars,
  isLoading,
  handleDragEnd,
  openEditModal,
  handleDelete
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-zinc-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mb-4"></div>
        Carregando frota...
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col flex-1 min-h-0 overflow-hidden shadow-xl">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse relative">
            <thead className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur-sm">
              <tr className="border-b border-zinc-800 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                <th className="px-6 py-4 w-10"></th>
                <th className="px-6 py-4">Veículo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Preço (R$)</th>
                <th className="px-6 py-4 hidden lg:table-cell">Especificações</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <Droppable droppableId="cars-table">
              {(provided) => (
                <tbody 
                  className="divide-y divide-zinc-800/60"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cars?.map((car, index) => (
                    <Draggable key={car.id} draggableId={car.id} index={index}>
                      {(provided, snapshot) => (
                        <tr 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`hover:bg-zinc-800/50 transition-colors group ${snapshot.isDragging ? 'bg-zinc-800/80 shadow-2xl relative z-50 rounded-xl' : ''}`}
                          style={{...provided.draggableProps.style}}
                        >
                          
                          <td className="px-3 md:px-6 py-4 text-zinc-600 hover:text-white cursor-grab active:cursor-grabbing touch-none" {...provided.dragHandleProps}>
                            <div className="p-2 -ml-2">
                              <GripVertical className="w-6 h-6" />
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-12 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-700">
                                {car.fotos && car.fotos.length > 0 ? (
                                  <img src={car.fotos.find(f => f.isMain)?.url || car.fotos[0].url} alt={car.marcaModelo} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center"><Car className="w-5 h-5 text-zinc-600"/></div>
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-100 line-clamp-1">{car.marcaModelo}</p>
                                <p className="text-xs text-zinc-500 line-clamp-1">{car.resumo}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border
                              ${car.status === 'DISPONIVEL' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                                car.status === 'VENDIDO' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                                'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                              {car.status}
                            </span>
                          </td>

                          <td className="px-6 py-4 font-bold text-slate-200 break-keep min-w-32">
                            R$ {Number(car.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>

                          <td className="px-6 py-4 hidden lg:table-cell text-zinc-400 text-sm">
                            <div className="flex gap-4">
                              <span className="flex items-center gap-1.5 whitespace-nowrap" title="Ano"><Calendar className="w-4 h-4 text-zinc-500" /> {car.anoModelo}</span>
                              <span className="flex items-center gap-1.5 whitespace-nowrap" title="Km"><Gauge className="w-4 h-4 text-zinc-500" /> {car.km.toLocaleString('pt-BR')}</span>
                              <span className="flex items-center gap-1.5 whitespace-nowrap" title="Combustível"><Fuel className="w-4 h-4 text-zinc-500" /> {car.combustivel.slice(0, 4)}.</span>
                            </div>
                          </td>

                          <td className="px-2 md:px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => openEditModal(car)} className="p-2 md:p-2.5 bg-zinc-800 hover:bg-brand-yellow rounded-lg text-zinc-300 hover:text-zinc-950 transition-colors cursor-pointer" title="Editar Veículo">
                                <Edit2 className="w-4 h-4 md:w-5 md:h-5 pointer-events-none" />
                              </button>
                              <button onClick={() => handleDelete(car.id)} className="p-2 md:p-2.5 bg-zinc-800 hover:bg-red-600 rounded-lg text-zinc-300 hover:text-white transition-colors cursor-pointer" title="Excluir Definitivamente">
                                <Trash2 className="w-4 h-4 md:w-5 md:h-5 pointer-events-none" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {(!cars || cars.length === 0) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                        Nenhum veículo cadastrado na frota no momento.
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </Droppable>
          </table>
        </div>
      </DragDropContext>
    </div>
  );
};
