import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import api from '../../services/api';
import type { Car, Photo, CarFormData, NewFile } from '../../types';
import { carSchema } from '../../types';

import { Header } from './components/Header';
import { FormFields } from './components/FormFields';
import { DescriptionEditor } from './components/DescriptionEditor';
import { ImageGallery } from './components/ImageGallery';
import { Footer } from './components/Footer';

interface CarModalProps {
  isOpen: boolean;
  onClose: () => void;
  carToEdit: Car | null;
}

const CarModal: React.FC<CarModalProps> = ({ isOpen, onClose, carToEdit }) => {
  const queryClient = useQueryClient();
  const [existingPhotos, setExistingPhotos] = useState<Photo[]>([]);
  const [newFiles, setNewFiles] = useState<NewFile[]>([]);
  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);
  const [mainPhotoVal, setMainPhotoVal] = useState<string>('');
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      status: 'DISPONIVEL',
      tipo: 'CARRO'
    }
  });

  const descricaoValue = watch('descricao') || '';

  const { data: fullCar, isFetching } = useQuery({
    queryKey: ['car', carToEdit?.id],
    queryFn: async () => {
      const { data } = await api.get(`/cars/${carToEdit!.id}`);
      return data;
    },
    enabled: !!carToEdit?.id && isOpen,
  });

  useEffect(() => {
    if (carToEdit) {
      reset({
        ...carToEdit,
        preco: Number(carToEdit.preco),
        status: carToEdit.status as 'DISPONIVEL' | 'VENDIDO' | 'RESERVADO' | 'OCULTO',
        tipo: (carToEdit as any).tipo || 'CARRO',
      });
      setNewFiles([]);
      setDeletedPhotos([]);
      
      if (fullCar) {
        const mappedPhotos = fullCar.fotos || [];
        setExistingPhotos(mappedPhotos);
        const mainObj = mappedPhotos.find((p: Photo) => p.isMain);
        setMainPhotoVal(mainObj ? mainObj.id : (mappedPhotos[0]?.id || ''));
      } else {
        setExistingPhotos([]);
        setMainPhotoVal('');
      }
    } else {
      reset({
        marcaModelo: '',
        resumo: '',
        anoFabricacao: new Date().getFullYear(),
        anoModelo: new Date().getFullYear() + 1,
        km: 0,
        cambio: 'Automático',
        carroceria: 'Sedan',
        combustivel: 'Flex',
        cor: '',
        preco: 0,
        status: 'DISPONIVEL',
        tipo: 'CARRO',
        placa: '',
        descricao: ''
      });
      setExistingPhotos([]);
      setNewFiles([]);
      setDeletedPhotos([]);
      setMainPhotoVal('');
    }
  }, [carToEdit, isOpen, reset, fullCar]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter(f => f.type.startsWith('image/'));
      
      if (validFiles.length !== filesArray.length) {
        toast.error('Apenas arquivos de formato imagem são permitidos.');
      }

      const newFilesArray: NewFile[] = validFiles.map((file, idx) => ({
        id: `new-${Date.now()}-${idx}`,
        file,
        previewUrl: URL.createObjectURL(file)
      }));

      setNewFiles(prev => {
        const combined = [...prev, ...newFilesArray];
       
        if (!mainPhotoVal && combined.length > 0 && existingPhotos.length === 0) {
          setMainPhotoVal(combined[0].id);
        }
        return combined;
      });
    }
  };

  const removeNewFile = (id: string) => {
    setNewFiles(prev => prev.filter(f => f.id !== id));
    if (mainPhotoVal === id) {
      setMainPhotoVal('');
    }
  };

  const handleDeleteExisting = (id: string) => {
    setDeletedPhotos(prev => [...prev, id]);
    setExistingPhotos(prev => prev.filter(p => p.id !== id));
    if (mainPhotoVal === id) {
      setMainPhotoVal('');
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: CarFormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      if (newFiles.length > 0) {
        newFiles.forEach(f => {
          formData.append('fotos', f.file);
        });
      }

      deletedPhotos.forEach(id => formData.append('deletedPhotos', id));

      let mainPhotoToSubmit = mainPhotoVal;
      const mainIsNewIndex = newFiles.findIndex(f => f.id === mainPhotoVal);
      if (mainIsNewIndex !== -1) {
        mainPhotoToSubmit = `new-${mainIsNewIndex}`;
      }
      formData.append('mainPhotoVal', mainPhotoToSubmit);

      if (carToEdit) {
        return api.patch(`/cars/${carToEdit.id}`, formData);
      } else {
        return api.post('/cars', formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      toast.success(carToEdit ? 'Veículo atualizado com sucesso!' : 'Veículo criado com sucesso!');
      onClose();
    },
    onError: () => {
      toast.error('Erro ao processar as informações do veículo.');
    }
  });

  const onSubmit = (data: CarFormData) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        <Header isEditing={!!carToEdit} onClose={onClose} />

        <div className="flex-1 overflow-y-auto p-6 relative">
          {isFetching && (
            <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-b-3xl">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-yellow"></div>
            </div>
          )}
          <form id="car-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormFields register={register} errors={errors} />
            
            <DescriptionEditor value={descricaoValue} setValue={setValue} />

            <ImageGallery
              existingPhotos={existingPhotos}
              newFiles={newFiles}
              mainPhotoVal={mainPhotoVal}
              setMainPhotoVal={setMainPhotoVal}
              handleDeleteExisting={handleDeleteExisting}
              handleFileChange={handleFileChange}
              removeNewFile={removeNewFile}
            />
          </form>
        </div>

        <Footer onClose={onClose} isPending={mutation.isPending} isEditing={!!carToEdit} />

      </div>
    </div>
  );
};

export default CarModal;
