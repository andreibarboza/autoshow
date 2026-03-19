import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import type { Car } from '../../types';
import Navbar from '../../components/Navbar';
import { ArrowLeft, Car as CarIcon } from 'lucide-react';
import { useState } from 'react';
import { ImageCarousel } from './components/ImageCarousel';
import { CarHeader } from './components/CarHeader';
import { Specifications } from './components/Specifications';
import { CarDescription } from './components/CarDescription';

const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get(`/cars/${id}`);
  return data;
};

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { data: car, isLoading, error } = useQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCarById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-slate-100 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mb-4"></div>
        <p className="text-zinc-400 font-medium">Buscando veículo...</p>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-zinc-950 text-slate-100 flex flex-col items-center justify-center p-4 text-center">
        <CarIcon className="w-16 h-16 text-zinc-700 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Veículo não encontrado</h2>
        <p className="text-zinc-500 mb-8 max-w-md">Este veículo pode ter sido excluído do nosso catálogo ou o link está quebrado.</p>
        <Link to="/" className="text-brand-yellow hover:text-brand-yellow-hover font-medium flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar para a vitrine
        </Link>
      </div>
    );
  }

  const sortedPhotos = [...(car.fotos || [])].sort((a, b) => Number(b.isMain) - Number(a.isMain));

  const scrollToImage = (index: number) => {
    const container = document.getElementById('carousel-container');
    if (container) {
      const item = container.children[1] as HTMLElement;
      if (item) {
        const itemWidth = item.clientWidth + 16;
        container.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const item = container.children[1] as HTMLElement;
    if (!item) return;
    const itemWidth = item.clientWidth + 16;
    const index = Math.round(container.scrollLeft / itemWidth);
    if (index !== activeImageIndex && index >= 0 && index < sortedPhotos.length) {
      setActiveImageIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 font-sans pb-20 overflow-x-hidden">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 md:pt-32 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para o catálogo
        </Link>

        <ImageCarousel
          photos={sortedPhotos}
          activeImageIndex={activeImageIndex}
          carName={car.marcaModelo}
          scrollToImage={scrollToImage}
          handleScroll={handleScroll}
        />

        <CarHeader
          marcaModelo={car.marcaModelo}
          status={car.status}
          resumo={car.resumo}
          preco={car.preco}
        />

        <div className="flex flex-col gap-8">
          
          <div className="space-y-6">
            <Specifications car={car} />
          </div>

          <div className="space-y-6">
            
            {car.descricao && (
              <CarDescription descricao={car.descricao} />
            )}
          </div>
        </div>

        <div className="mt-12 w-full fade-in pb-12">
          {car.status === 'VENDIDO' ? (
            <button disabled className="w-full bg-zinc-900 border border-zinc-800 text-zinc-600 text-base font-bold h-[40px] rounded-xl cursor-not-allowed shadow-inner">
              Este veículo não está mais disponível
            </button>
          ) : (
            <a
              href={`https://wa.me/5535992018997?text=${encodeURIComponent(`Olá, me interessei pelo ${car.marcaModelo}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full relative overflow-hidden group bg-green-600 hover:bg-green-500 text-white font-bold text-base h-[40px] rounded-xl transition-all shadow-lg shadow-green-600/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2 hover:shadow-green-600/40"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Tenho Interesse
              </span>
            </a>
          )}
        </div>
      </main>

    </div>
  );
};

export default CarDetails;
