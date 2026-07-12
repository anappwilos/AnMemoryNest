import React, { useState } from 'react';
import { Shield, Key, Heart, Download, UserCheck, Check, AlertCircle } from 'lucide-react';

export const DigitalLegacy = () => {
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
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 rounded-3xl p-8 border border-stone-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-100">
            <Shield className="w-6 h-6" />
            <span className="font-serif font-bold text-lg">Cápsula Segura</span>
          </div>
          <h2 className="text-4xl font-serif text-white font-bold">Legado y Permanencia</h2>
          <p className="text-stone-300 max-w-xl">Asegura que tus recuerdos sigan siendo accesibles para las futuras generaciones con total privacidad, respeto y dignidad digital.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Heredero Digital / Persona de Confianza */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-950 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-900" />
              Contacto de Legado (Heredero)
            </h3>
            <p className="text-xs text-stone-500 mt-1">Designa a un familiar de confianza que heredará y gestionará el archivo familiar si tu cuenta queda inactiva.</p>
          </div>

          {saved && (
            <div className="bg-emerald-50 text-emerald-800 text-xs rounded-xl p-3 font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" /> ¡Configuración de legado guardada con éxito!
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Nombre completo</label>
                <input 
                  type="text" 
                  value={trustedName}
                  onChange={(e) => setTrustedName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Correo electrónico</label>
                <input 
                  type="email" 
                  value={trustedEmail}
                  onChange={(e) => setTrustedEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Parentesco</label>
                <input 
                  type="text" 
                  value={trustedRelation}
                  onChange={(e) => setTrustedRelation(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-grow bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold py-2 rounded-lg transition">Guardar cambios</button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold px-4 py-2 rounded-lg transition">Cancelar</button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-2">
                <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">Designado actualmente</p>
                <p className="font-serif font-bold text-stone-900 text-lg">{trustedName}</p>
                <p className="text-sm text-stone-600">{trustedEmail} ({trustedRelation})</p>
              </div>
              <button 
                onClick={() => setIsEditing(true)} 
                className="text-xs border border-stone-300 text-stone-700 hover:bg-stone-50 px-4 py-2 rounded-lg font-bold transition"
              >
                Modificar contacto de legado
              </button>
            </div>
          )}
        </div>

        {/* Exportar Bóveda de Recuerdos */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-950 flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-900" />
                Exportar Bóveda de Recuerdos
              </h3>
              <p className="text-xs text-stone-500 mt-1">Descarga todas tus fotografías, vídeos, grabaciones de voz y relatos escritos en un único archivo comprimido ZIP de máxima calidad.</p>
            </div>

            {exportComplete && (
              <div className="bg-emerald-50 text-emerald-800 text-xs rounded-xl p-3 font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" /> ¡Bóveda lista! La descarga de "anmemorynest-export.zip" ha comenzado automáticamente.
              </div>
            )}

            <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-950/5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-900 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-stone-700 leading-relaxed">
                Tus recuerdos te pertenecen. AnMemoryNest nunca secuestrará tus archivos. Puedes exportar o eliminar todo tu contenido cuando lo desees de manera irreversible.
              </p>
            </div>
          </div>

          <button 
            onClick={handleExport} 
            disabled={isExporting}
            className={`w-full py-3.5 rounded-xl text-sm font-serif font-bold transition flex items-center justify-center gap-2 ${
              isExporting ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : 'bg-amber-900 hover:bg-amber-800 text-white shadow-sm'
            }`}
          >
            {isExporting ? 'Generando archivo ZIP de seguridad...' : 'Exportar mi Bóveda Completa'}
          </button>
        </div>

      </div>
    </div>
  );
};
