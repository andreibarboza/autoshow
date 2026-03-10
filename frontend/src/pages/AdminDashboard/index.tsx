import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import type { AuthState } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import type { DropResult } from '@hello-pangea/dnd';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import type { Car as CarType } from '../../types';
import CarModal from '../../components/CarModal/index';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CarsTable } from './components/CarsTable';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state: AuthState) => state.logout);
  const userEmail = useAuthStore((state: AuthState) => state.userEmail);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const { data: cars, isLoading } = useQuery<CarType[]>({
    queryKey: ['cars'],
    queryFn: async () => {
      const { data } = await api.get('/cars');
      return data;
    }
  });

  const reorderMutation = useMutation({
    mutationFn: (items: { id: string; displayOrder: number }[]) => 
      api.patch('/cars/reorder', { items }),
    onMutate: async (newOrderItems) => {
     
      await queryClient.cancelQueries({ queryKey: ['cars'] });
      const previousCars = queryClient.getQueryData<CarType[]>(['cars']);
      
      if (previousCars) {
       
        const idToOrder = new Map(newOrderItems.map(i => [i.id, i.displayOrder]));
        const optimiscCars = [...previousCars].sort((a, b) => {
          const orderA = idToOrder.get(a.id) ?? a.displayOrder ?? 0;
          const orderB = idToOrder.get(b.id) ?? b.displayOrder ?? 0;
          return orderA - orderB;
        });
        queryClient.setQueryData(['cars'], optimiscCars);
      }
      return { previousCars };
    },
    onError: (_err, _newOrderItems, context) => {
      if (context?.previousCars) {
        queryClient.setQueryData(['cars'], context.previousCars);
      }
      toast.error('Erro ao reordenar os itens no banco de dados.');
    },
    onSuccess: () => {
      toast.success('Ordenação salva com sucesso!');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/cars/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      toast.success('Veículo excluído do catálogo.');
      setItemToDelete(null);
    },
    onError: () => toast.error('Erro de permissão ou conexão ao excluir.')
  });

  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setItemToDelete(id);
  };

  const confirmDelete = () => {
    if (itemToDelete) deleteMutation.mutate(itemToDelete);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState<CarType | null>(null);

  const openCreateModal = () => {
    setCarToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (car: CarType) => {
    setCarToEdit(car);
    setIsModalOpen(true);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !cars) return;
    if (result.destination.index === result.source.index) return;

    const items = Array.from(cars);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatePayload = items.map((car, index) => ({
      id: car.id,
      displayOrder: index
    }));

    reorderMutation.mutate(updatePayload);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 font-sans flex text-sm md:text-base">
      <Sidebar userEmail={userEmail} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <Header onLogout={handleLogout} openCreateModal={openCreateModal} />

        <div className="p-4 md:p-8 flex-1 flex flex-col min-h-0 overflow-hidden">
          <CarsTable 
            cars={cars} 
            isLoading={isLoading} 
            handleDragEnd={handleDragEnd} 
            openEditModal={openEditModal} 
            handleDelete={handleDelete} 
          />
        </div>
      </main>

      <CarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} carToEdit={carToEdit} />
      
      <DeleteConfirmModal 
        itemToDelete={itemToDelete} 
        setItemToDelete={setItemToDelete} 
        confirmDelete={confirmDelete} 
        isPending={deleteMutation.isPending} 
      />
    </div>
  );
};

export default AdminDashboard;
