import React, { useState } from 'react';
import { Users, UserPlus, Heart, Search, Check, Shield, Award } from 'lucide-react';

interface Relative {
  name: string;
  relation: string;
  avatar: string;
  confirmedMemories: number;
  invited?: boolean;
}

export const PeopleManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [relatives, setRelatives] = useState<Relative[]>([
    { name: 'Abuela Carmen', relation: 'Abuela', avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=100', confirmedMemories: 42 },
    { name: 'Mamá (María)', relation: 'Madre', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', confirmedMemories: 112 },
    { name: 'Carlos Ruiz', relation: 'Tío', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', confirmedMemories: 18 },
    { name: 'Abuelo Manuel', relation: 'Abuelo (Legado)', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', confirmedMemories: 89, invited: false }
  ]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRelation, setInviteRelation] = useState('Hermano/a');
  const [successMsg, setSuccessMsg] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName) return;
    setRelatives([
      ...relatives,
      { name: inviteName, relation: inviteRelation, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100', confirmedMemories: 0, invited: true }
    ]);
    setInviteName('');
    setInviteEmail('');
    setSuccessMsg(`¡Invitación enviada a ${inviteName}!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const filtered = relatives.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-950 font-bold">Personas y Árbol</h2>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-1 rounded-full uppercase tracking-wider">En desarrollo</span>
          </div>
          <p className="text-sm md:text-base text-stone-600 mt-1 md:mt-0">Identifica a tus seres queridos y asócialos a las voces e imágenes de tus álbumes.</p>
        </div>
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Relatives Grid */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((r, idx) => (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex gap-4 items-center">
                <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover border border-stone-100" />
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-1.5">
                    {r.name}
                    {r.invited && (
                      <span className="text-[10px] bg-amber-900/10 text-amber-900 px-2 py-0.5 rounded-full uppercase">
                        Invitado
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <Heart className="w-3 h-3 text-red-500" />
                    <span>Relación: {r.relation}</span>
                  </div>
                  <p className="text-xs text-stone-500">{r.confirmedMemories} recuerdos confirmados</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-900/5 rounded-2xl p-5 border border-amber-950/5 flex items-start gap-3 mt-6">
            <Shield className="w-5 h-5 text-amber-950 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-amber-950 text-sm">Privacidad e Identidad Protegida</h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                AnMemoryNest no comparte datos biométricos ni rostros identificados fuera de tus álbumes compartidos. Solo tú y los colaboradores que invites podéis ver el árbol familiar.
              </p>
            </div>
          </div>
        </div>

        {/* Invite relative card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm h-fit space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-950 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amber-900" />
              Invitar Familiar
            </h3>
            <p className="text-xs text-stone-500 mt-1">Suma a una nueva persona a tus álbumes para que aporte su voz y recuerdos.</p>
          </div>

          {successMsg && (
            <div className="bg-emerald-50 text-emerald-800 text-xs rounded-xl p-3 font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" /> {successMsg}
            </div>
          )}

          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Nombre completo</label>
              <input 
                type="text" 
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Ej. Tío Alberto" 
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Correo electrónico</label>
              <input 
                type="email" 
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="correo@ejemplo.com" 
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Relación / Parentesco</label>
              <select 
                value={inviteRelation}
                onChange={(e) => setInviteRelation(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-900 focus:outline-none"
              >
                <option value="Hermano/a">Hermano/a</option>
                <option value="Padre/Madre">Padre/Madre</option>
                <option value="Tío/a">Tío/a</option>
                <option value="Abuelo/a">Abuelo/a</option>
                <option value="Primo/a">Primo/a</option>
                <option value="Hijo/a">Hijo/a</option>
                <option value="Amigo/a">Amigo/a</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full bg-amber-900 text-white hover:bg-amber-800 text-sm font-serif font-bold py-2.5 rounded-xl transition shadow-sm"
            >
              Enviar Invitación Privada
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
