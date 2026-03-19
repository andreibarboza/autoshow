import React from 'react';
import { UploadCloud, Star, Trash2, X } from 'lucide-react';
import type { Photo, NewFile } from '../../../types';

interface ImageGalleryProps {
  existingPhotos: Photo[];
  newFiles: NewFile[];
  mainPhotoVal: string;
  setMainPhotoVal: (id: string) => void;
  handleDeleteExisting: (id: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeNewFile: (id: string) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  existingPhotos,
  newFiles,
  mainPhotoVal,
  setMainPhotoVal,
  handleDeleteExisting,
  handleFileChange,
  removeNewFile
}) => {
  return (
    <div className="mt-8 pt-6 border-t border-zinc-800">
      <h3 className="text-sm font-semibold text-brand-yellow uppercase tracking-wider mb-4">Galeria do Veículo</h3>

      {existingPhotos.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-zinc-400 mb-3">Imagens Salvas (Sincronização pendente ao salvar)</p>
          <div className="flex flex-wrap gap-4">
            {existingPhotos.map((photo) => {
              const isMain = mainPhotoVal === photo.id;
              return (
              <div key={photo.id} className={`relative w-28 h-28 rounded-xl overflow-hidden border-2 ${isMain ? 'border-amber-500 shadow-lg shadow-amber-500/20' : 'border-zinc-700'}`}>
                <img src={photo.url} alt="Capa" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!isMain && (
                    <button type="button" onClick={() => setMainPhotoVal(photo.id)} className="p-1.5 bg-zinc-800 hover:bg-amber-500 rounded-lg text-white transition-colors cursor-pointer" title="Definir Capa Principal">
                      <Star className="w-4 h-4 pointer-events-none" />
                    </button>
                  )}
                  <button type="button" onClick={() => handleDeleteExisting(photo.id)} className="p-1.5 bg-zinc-800 hover:bg-red-600 rounded-lg text-white transition-colors cursor-pointer" title="Apagar do Cadastro">
                    <Trash2 className="w-4 h-4 pointer-events-none" />
                  </button>
                </div>
                {isMain && <div className="absolute top-1 left-1 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">CAPA</div>}
              </div>
            )})}
          </div>
        </div>
      )}

      <label className="border-2 border-dashed border-zinc-700 hover:border-brand-yellow bg-zinc-950/50 hover:bg-zinc-900/80 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer group">
        <div className="bg-zinc-900 p-4 rounded-full group-hover:bg-brand-yellow/20 mb-3 transition-colors">
          <UploadCloud className="w-8 h-8 text-zinc-500 group-hover:text-brand-yellow" />
        </div>
        <p className="font-medium text-zinc-300">Clique para anexar novas imagens</p>
        <p className="text-xs text-zinc-500 mt-1">PNG, JPG, WEBP (Max 5MB un.)</p>
        <input type="file" multiple accept="image/png, image/jpeg, image/jpg, image/webp" className="hidden" onChange={handleFileChange} />
      </label>

      {newFiles.length > 0 && (
        <div className="mt-4 border border-brand-yellow/30 bg-brand-yellow/10 p-4 rounded-2xl">
          <p className="text-xs text-brand-yellow mb-3 font-medium">Novas imagens prontas para upload no salvamento:</p>
          <div className="flex gap-4 overflow-x-auto pb-2 items-center">
            {newFiles.map((f) => {
              const isMain = mainPhotoVal === f.id;
              return (
              <div key={f.id} className={`relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 ${isMain ? 'border-amber-500' : 'border-zinc-700'} group`}>
                <img src={f.previewUrl} alt="preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                  {!isMain && (
                    <button type="button" onClick={() => setMainPhotoVal(f.id)} className="p-1.5 bg-zinc-800 hover:bg-amber-500 rounded-lg text-white transition-colors cursor-pointer" title="Definir Capa Principal">
                      <Star className="w-3 h-3 pointer-events-none" />
                    </button>
                  )}
                  <button type="button" onClick={() => removeNewFile(f.id)} className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-500 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <X className="w-3 h-3 pointer-events-none" />
                  </button>
                </div>
                {isMain && <div className="absolute top-1 left-1 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">CAPA</div>}
              </div>
            )})}
          </div>
        </div>
      )}
    </div>
  );
};
