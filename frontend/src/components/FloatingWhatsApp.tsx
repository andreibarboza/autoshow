import { MessageCircle } from 'lucide-react';

interface FloatingActionWhatsAppProps {
  phoneNumber: string;
  message?: string;
}

const FloatingActionWhatsApp = ({ phoneNumber, message = "Olá! Gostaria de ajuda para encontrar meu carro ideal na AutoShow." }: FloatingActionWhatsAppProps) => {
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 group flex flex-col items-end">
      
      <div className="mb-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none origin-bottom-right">
        <div className="bg-zinc-900 border border-zinc-800 text-slate-200 text-sm py-2.5 px-4 rounded-xl shadow-xl shadow-black/30 whitespace-nowrap hidden md:block relative">
          Não encontrou o carro ideal? <br/><span className="font-semibold text-green-400 mt-1 block">A gente encontra pra você!</span>
          
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-zinc-900 border-b border-r border-zinc-800 rotate-45"></div>
        </div>
      </div>

      <button 
        onClick={handleWhatsAppClick}
        className="w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] hover:-translate-y-1 transition-all duration-300 ring-4 ring-zinc-950"
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle fill="currentColor" strokeWidth={1} viewBox="2 2 20 20" className="w-8 h-8 md:w-9 md:h-9" />
      </button>
    </div>
  );
};

export default FloatingActionWhatsApp;
