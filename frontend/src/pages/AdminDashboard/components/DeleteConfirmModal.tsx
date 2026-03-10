import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  itemToDelete: string | null;
  setItemToDelete: (id: string | null) => void;
  confirmDelete: () => void;
  isPending: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ itemToDelete, setItemToDelete, confirmDelete, isPending }) => {
  if (!itemToDelete) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
          <Trash2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Apagar Veículo?</h3>
        <p className="text-sm text-zinc-400 mb-6">
          Esta ação é permanente e removerá todas as fotos atreladas do banco de dados. Deseja prosseguir?
        </p>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setItemToDelete(null)} 
            disabled={isPending}
            className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            onClick={confirmDelete}
            disabled={isPending}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors cursor-pointer flex justify-center items-center gap-2"
          >
            {isPending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
};
