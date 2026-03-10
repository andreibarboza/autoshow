import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-900 transition-all duration-300">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="bg-blue-600 p-2 md:p-2.5 rounded-xl group-hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
            <Car className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white">Auto<span className="text-blue-500">Show</span></span>
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
