import React from 'react';
import { ChevronLeft, ChevronRight, Car as CarIcon } from 'lucide-react';
import type { Photo } from '../../../types';

interface ImageCarouselProps {
  photos: Photo[];
  activeImageIndex: number;
  carName: string;
  scrollToImage: (index: number) => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  photos,
  activeImageIndex,
  carName,
  scrollToImage,
  handleScroll
}) => {
  return (
    <div className="w-[calc(100%+2rem)] -mx-4 md:w-full md:mx-0 mb-8 relative group">
      <div
        id="carousel-container"
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 before:shrink-0 before:w-[7.5%] md:before:w-[15%] lg:before:w-[20%] after:shrink-0 after:w-[7.5%] md:after:w-[15%] lg:after:w-[20%]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <div
              key={photo.id || index}
              onClick={() => scrollToImage(index)}
              className={`w-[85%] md:w-[70%] lg:w-[60%] shrink-0 snap-center rounded-2xl md:rounded-3xl overflow-hidden aspect-square shadow-2xl border border-zinc-800 bg-zinc-900 relative cursor-grab active:cursor-grabbing transition-transform duration-300 ${activeImageIndex === index ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-60 hover:opacity-100'}`}
            >
              <img src={photo.url} alt={`${carName} - Foto ${index + 1}`} className="w-full h-full object-cover pointer-events-none select-none" />
            </div>
          ))
        ) : (
          <div className="w-[85%] md:w-[70%] lg:w-[60%] shrink-0 snap-center rounded-2xl md:rounded-3xl overflow-hidden aspect-square shadow-2xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-700">
            <CarIcon className="w-16 h-16" />
          </div>
        )}
      </div>

      <style>{`
        #carousel-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {photos.length > 1 && (
        <>
          <button
            onClick={() => scrollToImage(activeImageIndex - 1)}
            disabled={activeImageIndex === 0}
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 bg-zinc-950/60 hover:bg-zinc-900/90 backdrop-blur-md border border-white/10 text-white p-3 md:p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-xl disabled:opacity-0 disabled:pointer-events-none z-10 hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={() => scrollToImage(activeImageIndex + 1)}
            disabled={activeImageIndex === photos.length - 1}
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 bg-zinc-950/60 hover:bg-zinc-900/90 backdrop-blur-md border border-white/10 text-white p-3 md:p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-xl disabled:opacity-0 disabled:pointer-events-none z-10 hidden md:flex"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </>
      )}

      {photos.length > 1 && (
        <div className="flex justify-center gap-2 mt-2 px-4 flex-wrap max-w-full">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToImage(i)}
              className={`h-1.5 rounded-full transition-all ${activeImageIndex === i ? 'w-8 bg-blue-500' : 'w-2 bg-zinc-700 hover:bg-zinc-500'}`}
              aria-label={`Ir para a foto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
