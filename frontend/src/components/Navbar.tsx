import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-zinc-950 md:bg-zinc-950/80 backdrop-blur-none md:backdrop-blur-lg border-b border-zinc-900 transition-all duration-300">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <img src="/carro_completo.jpg" alt="Pititi Veículos" className="hidden md:block h-12 md:h-14 object-contain" />
          <img src="/icone_carro.jpg" alt="Pititi Veículos" className="block md:hidden h-10 object-contain" />
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
