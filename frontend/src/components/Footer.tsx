import { Instagram, MapPin, MessageCircle } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/icone-rodape.png" alt="Pititi Veículos" className="h-14 object-contain mb-6 rounded-lg" />
            <p className="text-zinc-400 max-w-sm">
              Sua melhor escolha em seminovos premium. Veículos revisados com garantia e procedência.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-100 mb-6 font-sans">Endereço</h3>
            <ul className="space-y-4 text-zinc-400">
              <li className="flex items-start gap-3 justify-center md:justify-start text-left">
                <MapPin className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Rua Joaquim Murtinho n° 212, Berta<br />
                  São José do Itamonte, Minas Gerais<br />
                  Brasil, 37466-000
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-100 mb-6 font-sans">Redes Sociais</h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/pititiveiculos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-zinc-800 hover:bg-brand-yellow text-zinc-400 hover:text-zinc-950 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5535992018997?text=Olá! Gostaria de ajuda para encontrar meu carro ideal na Pititi Veículos." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-zinc-800 hover:bg-green-500 text-zinc-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm text-center md:text-left w-full">
            &copy; {new Date().getFullYear()} Pititi Veículos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
