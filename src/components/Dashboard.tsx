import React from 'react';

export const Dashboard = () => {
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-serif text-primary mb-8">Tu Archivo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-[4/5] bg-stone-200 rounded-sm mb-3 shadow-sm group-hover:shadow-md transition-shadow"></div>
            <h3 className="font-serif text-lg">Álbum familiar {i}</h3>
            <p className="text-sm text-stone-500">12 fotografías · 1950</p>
          </div>
        ))}
      </div>
    </main>
  );
};
