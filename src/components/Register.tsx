import React, { useState } from 'react';
import { Leaf, Eye } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { PROJECT_IMAGES } from '../lib/images';
import { useLanguage } from '../context/LanguageContext';

export const Register = ({ onNavigateToLogin }: { onNavigateToLogin: () => void }) => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(language === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match');
      return;
    }
    try {
      setIsLoading(true);
      setError('');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
    } catch (err: any) {
      setError(err.message || (language === 'es' ? 'Error al crear la cuenta' : 'Error creating account'));
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
    } catch (err: any) {
      setError(err.message || (language === 'es' ? 'Error al registrar con Google' : 'Error registering with Google'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[600px]">
        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-stone-100 relative hidden md:block">
            <img src={PROJECT_IMAGES.LANDING.REGISTER_BACKGROUND} alt="Family" className="w-full h-full object-cover" />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-8">
                <Leaf className="w-6 h-6 text-amber-900" />
                <h1 className="text-xl font-serif font-bold text-amber-900">AnMemoryNest</h1>
            </div>
            
            {error && <p className="text-red-600 mb-4 text-xs bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
            
            <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t('auth.nameLabel')}</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={language === 'es' ? 'Tu nombre' : 'Your name'} className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-900" required />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t('auth.emailLabel')}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com" className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-900" required />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t('auth.passwordLabel')}</label>
                    <div className="relative">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-900" required />
                        <Eye className="absolute right-2 top-2.5 w-4 h-4 text-stone-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{language === 'es' ? 'Confirmar contraseña' : 'Confirm Password'}</label>
                    <div className="relative">
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-900" required />
                        <Eye className="absolute right-2 top-2.5 w-4 h-4 text-stone-400" />
                    </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-amber-900 text-white font-bold py-2 rounded-md hover:bg-amber-800 transition text-sm cursor-pointer">
                  {isLoading ? '...' : t('auth.registerBtn')}
                </button>
            </form>

            <button 
              onClick={handleGoogleRegister} 
              disabled={isLoading}
              className="mt-4 w-full bg-white border border-stone-200 text-stone-700 font-medium py-2 rounded-md hover:bg-stone-50 transition flex items-center justify-center gap-2 text-sm cursor-pointer shadow-xs"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
              {isLoading ? '...' : (language === 'es' ? 'Regístrate con Google' : 'Register with Google')}
            </button>
            <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
                <div className="flex-1 h-px bg-stone-100"></div>
                <span>{language === 'es' ? 'O' : 'Or'}</span>
                <div className="flex-1 h-px bg-stone-100"></div>
            </div>
            <p className="mt-6 text-xs text-center text-stone-500">
                {t('auth.haveAccount')}{' '}
                <button onClick={onNavigateToLogin} className="text-amber-900 font-bold hover:underline cursor-pointer">
                  {language === 'es' ? 'Iniciar sesión' : 'Log In'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};
