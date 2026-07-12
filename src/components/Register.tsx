import React from 'react';
import { Leaf, Eye } from 'lucide-react';

export const Register = ({ onNavigateToLogin }: { onNavigateToLogin: () => void }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex w-full max-w-5xl h-[700px]">
        {/* Image Side */}
        <div className="w-1/2 bg-stone-200 relative">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Family" className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <p className="text-sm text-stone-600 mb-2">12 de mayo de 2024</p>
                <div className="w-10 h-10 rounded-full bg-amber-900 flex items-center justify-center text-white mb-2">▶</div>
                <p className="text-sm font-bold text-stone-900">Voz de la abuela</p>
                <div className="text-xs text-stone-500 mt-2 flex items-center gap-1">✓ Compartido con 3 personas más</div>
            </div>
        </div>

        {/* Form Side */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8">
                <Leaf className="w-8 h-8 text-amber-900" />
                <h1 className="text-2xl font-serif font-bold text-amber-900">MemoryNest</h1>
            </div>
            
            <h2 className="text-4xl font-serif text-stone-900 mb-2">Crea tu cuenta</h2>
            <p className="text-stone-600 mb-8">Empieza a preservar tus recuerdos más valiosos en un espacio privado y compartido.</p>
            
            <form className="space-y-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Nombre</label>
                        <input type="text" placeholder="Tu nombre" className="w-full bg-stone-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Apellidos</label>
                        <input type="text" placeholder="Tus apellidos" className="w-full bg-stone-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Correo electrónico</label>
                    <input type="email" placeholder="ejemplo@correo.com" className="w-full bg-stone-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Contraseña</label>
                    <div className="relative">
                        <input type="password" placeholder="Crea una contraseña" className="w-full bg-stone-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900" />
                        <Eye className="absolute right-3 top-3.5 w-5 h-5 text-stone-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Confirmar contraseña</label>
                    <div className="relative">
                        <input type="password" placeholder="Repite tu contraseña" className="w-full bg-stone-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-900" />
                        <Eye className="absolute right-3 top-3.5 w-5 h-5 text-stone-400" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-amber-900 text-white font-bold py-3 rounded-lg hover:bg-amber-800 transition">Crear mi cuenta</button>
            </form>
            
            <p className="mt-8 text-sm text-center text-stone-600">
                ¿Ya tienes una cuenta? <button onClick={onNavigateToLogin} className="text-amber-900 font-bold hover:underline">Iniciar sesión</button>
            </p>
        </div>
      </div>
    </div>
  );
};
