import React, { useState } from 'react';
import { Leaf, Eye } from 'lucide-react';

export const Login = ({ onNavigateToRegister, onLoginSuccess }: { onNavigateToRegister: () => void, onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'root@root.com' && password === 'root') {
      onLoginSuccess();
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex w-full max-w-5xl h-[600px]">
        {/* Form Side */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-12">
                <Leaf className="w-8 h-8 text-amber-900" />
                <h1 className="text-2xl font-serif font-bold text-amber-900">MemoryNest</h1>
            </div>
            
            <h2 className="text-4xl font-serif text-stone-900 mb-2">Bienvenido de nuevo</h2>
            <p className="text-stone-600 mb-8">Vuelve a tus álbumes y recuerdos compartidos.</p>
            
            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
            
            <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Correo electrónico</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com" className="w-full bg-stone-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900" required />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest">Contraseña</label>
                        <span className="text-xs text-stone-500 cursor-pointer hover:text-amber-900">¿Olvidaste tu contraseña?</span>
                    </div>
                    <div className="relative">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" className="w-full bg-stone-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900" required />
                        <Eye className="absolute right-3 top-3.5 w-5 h-5 text-stone-400" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-amber-900 focus:ring-amber-900" />
                    <label className="text-sm text-stone-600">Recuérdame en este dispositivo</label>
                </div>
                <button type="submit" className="w-full bg-amber-900 text-white font-bold py-3 rounded-lg hover:bg-amber-800 transition">Iniciar sesión</button>
            </form>
            
            <p className="mt-8 text-sm text-center text-stone-600">
                ¿No tienes una cuenta? <button onClick={onNavigateToRegister} className="text-amber-900 font-bold hover:underline">Crea una ahora</button>
            </p>
        </div>
        
        {/* Image Side */}
        <div className="w-1/2 bg-stone-200 relative">
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
