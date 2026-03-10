import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-zinc-900/50 p-6 rounded-full border border-zinc-800 mb-8">
          <Car className="w-16 h-16 text-zinc-700" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter text-zinc-200">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-zinc-400">
          Página não encontrada
        </h2>
        <p className="text-zinc-500 mb-10 max-w-md mx-auto text-lg">
          O veículo ou a página que você tentou acessar não existe ou foi removido do nosso catálogo.
        </p>
        
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-lg"
        >
          Voltar para a Vitrine
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
