import React, { useState } from 'react';
import { Shield, Key, Heart, Download, UserCheck, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DigitalLegacy = () => {
  const { t, language } = useLanguage();
  const [trustedName, setTrustedName] = useState('Ana López');
  const [trustedEmail, setTrustedEmail] = useState('ana.lopez@ejemplo.com');
  const [trustedRelation, setTrustedRelation] = useState('Hija');
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 5000);
    }, 2500);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 md:space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 rounded-3xl p-6 md:p-8 border border-stone-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-100">
            <Shield className="w-5 h-5 md:w-6 md:h-6" />
            <span className="font-serif font-bold text-base md:text-lg">
              {language === 'es' ? 'Cápsula Segura' : 'Secure Capsule'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white font-bold">
            {language === 'es' ? 'Legado y Permanencia' : 'Legacy & Permanence'}
          </h2>
          <p className="text-sm md:text-base text-stone-300 max-w-xl">
            {language === 'es' 
              ? 'Asegura que tus recuerdos sigan siendo accesibles para las futuras generaciones con total privacidad, respeto y dignidad digital.' 
              : 'Ensure that your memories remain accessible to future generations with absolute privacy, respect, and digital dignity.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Heredero Digital / Persona de Confianza */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-950 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-900" />
              {language === 'es' ? 'Contacto de Legado (Heredero)' : 'Legacy Contact (Heir)'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {language === 'es' 
                ? 'Designa a un familiar de confianza que heredará y gestionará el archivo familiar si tu cuenta queda inactiva.' 
                : 'Designate a trusted family member who will inherit and manage the family archive if your account remains inactive.'}
            </p>
          </div>

          {saved && (
            <div className="bg-emerald-50 text-emerald-800 text-xs rounded-xl p-3 font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" /> {language === 'es' ? '¡Configuración de legado guardada con éxito!' : 'Legacy settings saved successfully!'}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t('auth.nameLabel')}</label>
                <input 
                  type="text" 
                  value={trustedName}
                  onChange={(e) => setTrustedName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">{t('auth.emailLabel')}</label>
                <input 
                  type="email" 
                  value={trustedEmail}
                  onChange={(e) => setTrustedEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">
                  {language === 'es' ? 'Parentesco' : 'Relationship'}
                </label>
                <input 
                  type="text" 
                  value={trustedRelation}
                  onChange={(e) => setTrustedRelation(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-grow bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold py-2 rounded-lg transition cursor-pointer">
                  {language === 'es' ? 'Guardar cambios' : 'Save changes'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer">
                  {language === 'es' ? 'Cancelar' : 'Cancel'}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4 opacity-50 pointer-events-none">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-2">
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">
                    {language === 'es' ? 'Designado actualmente' : 'Currently designated'}
                  </p>
                  <p className="font-serif font-bold text-stone-900 text-lg">
                    {language === 'es' ? 'Sin asignar' : 'Unassigned'}
                  </p>
                  <p className="text-sm text-stone-600">--</p>
                </div>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="text-xs border border-stone-300 text-stone-700 hover:bg-stone-50 px-4 py-2 rounded-lg font-bold transition"
                >
                  {language === 'es' ? 'Modificar contacto de legado' : 'Modify legacy contact'}
                </button>
              </div>
              <p className="text-xs text-amber-900 font-bold mt-4 italic">
                {language === 'es' ? 'Función en desarrollo' : 'Feature under development'}
              </p>
            </>
          )}
        </div>

        {/* Exportar Bóveda de Recuerdos */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-950 flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-900" />
                {language === 'es' ? 'Exportar Bóveda de Recuerdos' : 'Export Memory Vault'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {language === 'es' 
                  ? 'Descarga todas tus fotografías, vídeos, grabaciones de voz y relatos escritos en un único archivo comprimido ZIP de máxima calidad.' 
                  : 'Download all your photos, videos, voice recordings, and written stories in a single high-quality ZIP compressed file.'}
              </p>
            </div>

            {exportComplete && (
              <div className="bg-emerald-50 text-emerald-800 text-xs rounded-xl p-3 font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" /> 
                {language === 'es' 
                  ? '¡Bóveda lista! La descarga de "anmemorynest-export.zip" ha comenzado automáticamente.' 
                  : 'Vault ready! Your download of "anmemorynest-export.zip" has started automatically.'}
              </div>
            )}

            <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-950/5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-900 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-stone-700 leading-relaxed">
                {language === 'es' 
                  ? 'Tus recuerdos te pertenecen. AnMemoryNest nunca secuestrará tus archivos. Puedes exportar o eliminar todo tu contenido cuando lo desees de manera irreversible.' 
                  : 'Your memories belong to you. AnMemoryNest will never keep your files hostage. You can export or delete all of your content whenever you want irreversibly.'}
              </p>
            </div>
          </div>

          <button 
            disabled
            className={`w-full py-3.5 rounded-xl text-sm font-serif font-bold transition flex items-center justify-center gap-2 bg-stone-200 text-stone-500 cursor-not-allowed`}
          >
            {language === 'es' ? 'Exportar mi Bóveda Completa (Próximamente)' : 'Export My Full Vault (Coming Soon)'}
          </button>
        </div>

      </div>
    </div>
  );
};
