import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import type { AuthState } from '../store/authStore';
import api from '../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const setToken = useAuthStore((state: AuthState) => state.setToken);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });

      setToken(data.access_token, email);

      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'E-mail ou senha inválidos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-4 font-sans text-slate-100">
      
      <div className="w-full max-w-md">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-brand-yellow/10 rounded-2xl mb-6 shadow-2xl shadow-brand-yellow/10 border border-brand-yellow/20">
            <img src="/carro_completo.jpg" alt="Pititi Veículos" className="h-10 object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Painel <span className="text-brand-yellow">Administrativo</span></h1>
          <p className="text-zinc-400">Entre com suas credenciais de gestão</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pititiveiculos.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-brand-yellow/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:border-brand-yellow/50 transition-colors"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-8 bg-brand-yellow hover:bg-brand-yellow-hover disabled:opacity-50 disabled:hover:bg-brand-yellow text-zinc-950 font-bold rounded-xl py-4 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-brand-yellow/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  Acessar Painel
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-zinc-600 text-sm mt-8">
          &copy; {new Date().getFullYear()} Pititi Veículos. Acesso restrito.
        </p>
      </div>

    </div>
  );
};

export default AdminLogin;
