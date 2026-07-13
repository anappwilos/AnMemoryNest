import React, { useState } from 'react';
import { Leaf, Eye, EyeOff, Info, Database, ShieldAlert } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { PROJECT_IMAGES } from '../lib/images';
import { useLanguage } from '../context/LanguageContext';

export const Login = ({ onNavigateToRegister, onLoginSuccess }: { 
  onNavigateToRegister: () => void; 
  onLoginSuccess: (mockUser?: any) => void;
}) => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const demoEmail = (import.meta as any).env.VITE_DEMO_EMAIL || 'root@root.com';
  const demoPassword = (import.meta as any).env.VITE_DEMO_PASSWORD || 'root';
  const persistEmail = (import.meta as any).env.VITE_PERSIST_EMAIL || 'nar@nar.com';
  const persistPassword = (import.meta as any).env.VITE_PERSIST_PASSWORD || 'admin_2030';

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');

      // 1. Check if it matches DEMO user (NO persistence)
      if (email === demoEmail && password === demoPassword) {
        onLoginSuccess({
          uid: 'mock_demo_root_user_uid',
          email: demoEmail,
          displayName: 'Administrador Demo',
          photoURL: PROJECT_IMAGES.AVATARS.DEFAULT
        });
        return;
      }

      // 2. Check if it matches PERSIST user (WITH persistence)
      if (email === persistEmail && password === persistPassword) {
        try {
          // Attempt standard sign-in
          await signInWithEmailAndPassword(auth, email, password);
        } catch (signInErr: any) {
          // If the user does not exist yet in Firebase, register them on-the-fly
          if (signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential') {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
              displayName: 'Administrador Persistente',
              photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
            });
          } else {
            throw signInErr;
          }
        }
        onLoginSuccess();
        return;
      }

      // 3. Normal user sign-in
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error("Auth error:", err);
      // Map Firebase auth errors to beautiful Spanish/English explanations
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError(language === 'es' ? 'El correo o la contraseña son incorrectos. Por favor, verifícalos o regístrate si aún no tienes una cuenta.' : 'Email or password is incorrect. Please verify them or register if you do not have an account yet.');
      } else if (err.code === 'auth/invalid-email') {
        setError(language === 'es' ? 'El formato del correo electrónico es inválido.' : 'The email address format is invalid.');
      } else if (err.code === 'auth/user-disabled') {
        setError(language === 'es' ? 'Esta cuenta de usuario ha sido desactivada.' : 'This user account has been disabled.');
      } else if (err.code === 'auth/too-many-requests') {
        setError(language === 'es' ? 'Demasiados intentos fallidos. Se ha bloqueado temporalmente el acceso.' : 'Too many failed attempts. Access has been temporarily locked.');
      } else {
        setError(err.message || (language === 'es' ? 'Error al iniciar sesión. Por favor, inténtalo de nuevo.' : 'Error signing in. Please try again.'));
      }
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
      setError(err.message || 'Error login Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[600px]">
        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
            <div className="flex items-center gap-2 mb-6">
                <Leaf className="w-6 h-6 text-amber-900" />
                <h1 className="text-xl font-serif font-bold text-amber-900">AnMemoryNest</h1>
            </div>

            {/* Quick Demo Credentials Access Banner */}
            <div className="bg-amber-50/70 border border-amber-200/50 rounded-xl p-3 mb-5 text-xs text-stone-700 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                <Info className="w-3.5 h-3.5 text-amber-800" />
                <span>{language === 'es' ? 'Acceso rápido de prueba' : 'Quick test access'}</span>
              </div>
              <p className="text-stone-500 leading-normal text-[11px]">
                {language === 'es' ? 'Haz clic en un modo para rellenar los datos de acceso:' : 'Click on a mode to auto-fill details:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setEmail(demoEmail);
                    setPassword(demoPassword);
                  }}
                  className="flex flex-col items-start p-2 rounded-lg bg-white border border-stone-200 hover:border-amber-800 text-left transition shadow-xs cursor-pointer"
                >
                  <span className="flex items-center gap-1 font-semibold text-amber-900 text-[10.5px]">
                    <ShieldAlert className="w-3 h-3" /> {language === 'es' ? 'Modo Demo' : 'Demo Mode'}
                  </span>
                  <span className="text-stone-400 font-mono text-[9px] mt-0.5">{language === 'es' ? 'Sin guardar datos' : 'No saved data'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail(persistEmail);
                    setPassword(persistPassword);
                  }}
                  className="flex flex-col items-start p-2 rounded-lg bg-white border border-stone-200 hover:border-amber-800 text-left transition shadow-xs cursor-pointer"
                >
                  <span className="flex items-center gap-1 font-semibold text-amber-900 text-[10.5px]">
                    <Database className="w-3 h-3" /> {language === 'es' ? 'Modo Persistente' : 'Persistent Mode'}
                  </span>
                  <span className="text-stone-400 font-mono text-[9px] mt-0.5">{language === 'es' ? 'Guarda en Firebase' : 'Saves in Firebase'}</span>
                </button>
              </div>
            </div>
            
            {error && <p className="text-red-700 mb-4 text-xs bg-red-50 p-2.5 rounded-lg border border-red-100">{error}</p>}
            
            <form className="space-y-4" onSubmit={handleEmailLogin}>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t('auth.emailLabel')}</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="ejemplo@correo.com" 
                      className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-900 focus:border-amber-900" 
                      required 
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{t('auth.passwordLabel')}</label>
                    <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          placeholder="••••••••" 
                          className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-900 focus:border-amber-900" 
                          required 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 transition cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
                
                <button type="submit" disabled={isLoading} className="w-full bg-amber-900 text-white font-bold py-2 rounded-md hover:bg-amber-800 transition text-sm flex items-center justify-center cursor-pointer">
                    {isLoading ? t('auth.loggingIn') : t('auth.loginBtn')}
                </button>
            </form>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
                <div className="flex-1 h-px bg-stone-100"></div>
                <span>{language === 'es' ? 'O' : 'Or'}</span>
                <div className="flex-1 h-px bg-stone-100"></div>
            </div>
 
            <button 
              onClick={handleGoogleLogin} 
              disabled={isLoading}
              className="mt-4 w-full bg-white border border-stone-200 text-stone-700 font-medium py-2 rounded-md hover:bg-stone-50 transition flex items-center justify-center gap-2 text-sm shadow-xs cursor-pointer"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
              {isLoading ? '...' : (language === 'es' ? 'Continuar con Google' : 'Continue with Google')}
            </button>
            
            <p className="mt-4 text-xs text-center text-stone-500">
                {t('auth.needAccount')}{' '}
                <button onClick={onNavigateToRegister} className="text-amber-900 font-bold hover:underline cursor-pointer">
                  {language === 'es' ? 'Regístrate' : 'Register'}
                </button>
            </p>
        </div>
        
        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-stone-100 relative hidden md:block">
            <img src={PROJECT_IMAGES.LANDING.LOGIN_BACKGROUND} alt="Family" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};
