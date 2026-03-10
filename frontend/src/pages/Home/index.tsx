import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import type { Car } from '../../types';
import { Car as CarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import type { FilterState } from '../../types';
import { MobileFilterModal } from './components/MobileFilterModal';
import { MobileFilterTrigger } from './components/MobileFilterTrigger';
import { CarCard } from './components/CarCard';

export const fetchCars = async (): Promise<Car[]> => {
  const { data } = await api.get('/cars');
  return data;
};

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars,
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    color: '',
    tipo: '',
    status: 'TODOS',
    hasFilters: false,
  });

  const clearFilters = () => {
    setFilters({
      search: '', minPrice: '', maxPrice: '', minYear: '', maxYear: '', color: '', tipo: '', status: 'TODOS', hasFilters: false
    });
  };

  const filteredCars = useMemo(() => {
    if (!data) return [];

    return data.filter(car => {
     
      if (car.status === 'OCULTO') return false;

      if (filters.hasFilters && car.status !== 'DISPONIVEL') {
        return false;
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchTitle = car.marcaModelo.toLowerCase().includes(searchLower);
        const matchDesc = car.resumo.toLowerCase().includes(searchLower);
        if (!matchTitle && !matchDesc) return false;
      }

      if (filters.minPrice && car.preco < Number(filters.minPrice)) return false;
      if (filters.maxPrice && car.preco > Number(filters.maxPrice)) return false;

      if (filters.minYear && car.anoFabricacao < Number(filters.minYear)) return false;

      if (filters.color && car.cor.toLowerCase() !== filters.color.toLowerCase()) return false;

      if (filters.tipo && car.tipo !== filters.tipo) return false;

      return true;
    });
  }, [data, filters]);

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 font-sans">
      <Navbar />

      <main className="pt-32 pb-10 container mx-auto px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Descubra o Seu <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Próximo Carro</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            A AutoShow traz para você uma seleção exclusiva de veículos testados, aprovados e prontos para a estrada visando a melhor experiência premium.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">

          <MobileFilterTrigger
            hasFilters={filters.hasFilters}
            clearFilters={clearFilters}
            openModal={() => setIsMobileFilterOpen(true)}
          />

          <MobileFilterModal
            isOpen={isMobileFilterOpen}
            setIsOpen={setIsMobileFilterOpen}
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            resultCount={filteredCars?.length || 0}
          />

          <div className="flex-1 w-full relative z-10">
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <CarIcon className="text-blue-500 w-6 h-6" />
              <span className="text-sm font-normal text-zinc-500 ml-auto">
                {filteredCars?.length === 1 ? '1 encontrado' : `${filteredCars?.length || 0} encontrados`}
              </span>
            </h2>

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 text-blue-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current mb-4"></div>
                <p className="text-zinc-400 font-medium">Carregando o catálogo premium...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-xl text-center font-medium">
                Ocorreu um problema ao conectar-se ao servidor de catálogo. Tente atualizar a página.
              </div>
            )}

            {!isLoading && !error && filteredCars?.length === 0 && (
              <div className="text-center py-24 bg-zinc-900/40 border border-zinc-800/50 rounded-3xl">
                <CarIcon className="mx-auto w-16 h-16 text-zinc-700 mb-6" />
                <p className="text-zinc-400 text-lg font-medium">Nenhum veículo encontrado.</p>
                <p className="text-zinc-500 text-sm mt-2">Tente ajustar ou limpar os filtros da busca lateral.</p>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredCars?.map((car, index) => {
                const isUnavailableAndUnfiltered = !filters.hasFilters && car.status !== 'DISPONIVEL';

                return (
                  <CarCard
                    key={car.id}
                    car={car}
                    index={index}
                    isUnavailableAndUnfiltered={isUnavailableAndUnfiltered}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Home;
