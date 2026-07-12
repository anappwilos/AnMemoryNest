import React, { useState } from 'react';
import { Leaf, Eye } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const Login = ({ onNavigateToRegister, onLoginSuccess }: { onNavigateToRegister: () => void, onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión con Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[600px]">
        {/* Form Side */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8 md:mb-12">
                <Leaf className="w-8 h-8 text-amber-900" />
                <h1 className="text-xl md:text-2xl font-serif font-bold text-amber-900">MemoryNest</h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">Bienvenido de nuevo</h2>
            <p className="text-stone-600 mb-8 text-sm md:text-base">Vuelve a tus álbumes y recuerdos compartidos.</p>
            
            {error && <p className="text-red-500 mb-4 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
            
            <form className="space-y-6" onSubmit={handleEmailLogin}>
                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Correo electrónico</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com" className="w-full bg-stone-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900" required />
                </div>
                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Contraseña</label>
                    <div className="relative">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" className="w-full bg-stone-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900" required />
                        <Eye className="absolute right-3 top-3.5 w-5 h-5 text-stone-400" />
                    </div>
                </div>
                
                <button type="submit" disabled={isLoading} className="w-full bg-amber-900 text-white font-bold py-3 rounded-lg hover:bg-amber-800 transition">
                    {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
                </button>
            </form>
            
            <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-stone-200"></div>
                <span className="text-stone-400 text-xs uppercase font-bold">O</span>
                <div className="flex-1 h-px bg-stone-200"></div>
            </div>

            <div className="mt-6 space-y-6">
                <button 
                  onClick={handleGoogleLogin} 
                  disabled={isLoading}
                  className="w-full bg-white border border-stone-300 text-stone-700 font-bold py-3 rounded-lg hover:bg-stone-50 transition flex items-center justify-center gap-2"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                  {isLoading ? 'Iniciando...' : 'Continuar con Google'}
                </button>
            </div>
            
            <p className="mt-8 text-sm text-center text-stone-600">
                ¿No tienes cuenta? <button onClick={onNavigateToRegister} className="text-amber-900 font-bold hover:underline">Crea una ahora</button>
            </p>
        </div>
        
        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-stone-200 relative hidden md:block">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Family" className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-900 flex items-center justify-center text-white">▶</div>
                    <div>
                        <p className="text-sm font-bold text-stone-900">Voz del abuelo</p>
                        <div className="w-32 h-1 bg-stone-300 rounded mt-1"></div>
                    </div>
                    <div className="ml-auto text-xs text-stone-500 text-right">
                        <p>3 de sep, 1998</p>
                        <p className="text-emerald-700 flex items-center gap-1">✓ VALIDADO</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
