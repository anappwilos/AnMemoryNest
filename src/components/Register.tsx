import React, { useState } from 'react';
import { Leaf, Eye } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const Register = ({ onNavigateToLogin }: { onNavigateToLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      setIsLoading(true);
      setError('');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      // App.tsx handles navigation on auth state change
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // App.tsx handles navigation on auth state change
    } catch (err: any) {
      setError(err.message || 'Error al registrar con Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-warm flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[600px]">
        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-stone-100 relative hidden md:block">
            <img src="https://images.unsplash.com/photo-1627353802076-bd439e09244b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Family" className="w-full h-full object-cover" />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8">
                <Leaf className="w-6 h-6 text-primary" />
                <h1 className="text-lg font-serif font-bold text-primary">MemoryNest</h1>
            </div>
            
            {/* <h2 className="text-2xl font-serif text-stone-900 mb-2">Crea tu cuenta</h2> */}
            {/* <p className="text-stone-600 mb-6 text-sm">Empieza a preservar tus recuerdos.</p> */}
            
            {error && <p className="text-red-600 mb-4 text-xs bg-red-50 p-3 rounded-lg">{error}</p>}
            
            <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Nombre completo</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="w-full bg-stone-50 border-none rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary" required />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Correo electrónico</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com" className="w-full bg-stone-50 border-none rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary" required />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Contraseña</label>
                    <div className="relative">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-stone-50 border-none rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary" required />
                        <Eye className="absolute right-2 top-2.5 w-4 h-4 text-stone-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Confirmar contraseña</label>
                    <div className="relative">
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full bg-stone-50 border-none rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary" required />
                        <Eye className="absolute right-2 top-2.5 w-4 h-4 text-stone-400" />
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-2 rounded-md hover:opacity-90 transition text-sm">
                  {isLoading ? '...' : 'Crear mi cuenta'}
                </button>
            </form>
            


            <button 
              onClick={handleGoogleRegister} 
              disabled={isLoading}
              className="mt-4 w-full bg-white border border-stone-200 text-stone-700 font-medium py-2 rounded-md hover:bg-stone-50 transition flex items-center justify-center gap-2 text-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
              {isLoading ? '...' : 'Registrate con Google'}
            </button>
            <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
                <div className="flex-1 h-px bg-stone-100"></div>
                <span>O</span>
                <div className="flex-1 h-px bg-stone-100"></div>
            </div>
            <p className="mt-6 text-xs text-center text-stone-500">
                ¿Ya tienes una cuenta? <button onClick={onNavigateToLogin} className="text-primary font-bold hover:underline">Iniciar sesión</button>
            </p>
        </div>
      </div>
    </div>
  );
};
