import React from 'react';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-500">
      <div className="bg-neo-yellow border-4 border-black p-8 md:p-12 shadow-brutal flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
            FOOD <br/> DELIVERY <br/> <span className="text-white" style={{textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 4px 4px 0px rgba(0,0,0,1)'}}>SYSTEM</span>
          </h1>
          <p className="font-bold text-xl md:text-2xl mt-4 border-l-8 border-black pl-4">
            Manage restaurants, orders, customers, and delivery partners like a boss.
          </p>
        </div>
        <div className="w-full md:w-auto flex flex-col gap-4">
          <button 
            onClick={() => onNavigate('restaurants')}
            className="bg-white border-4 border-black py-4 px-8 text-2xl font-black uppercase hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all w-full text-center"
          >
            Enter Dashboard 🚀
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { id: 'restaurants', title: 'Restaurants', color: 'bg-neo-yellow', icon: '🍔' },
          { id: 'customers', title: 'Customers', color: 'bg-neo-pink', icon: '🧑‍🤝‍🧑' },
          { id: 'delivery_partners', title: 'Drivers', color: 'bg-neo-cyan', icon: '🛵' },
          { id: 'dishes', title: 'Menu Items', color: 'bg-neo-green', icon: '🍟' },
          { id: 'orders', title: 'Live Orders', color: 'bg-neo-orange', icon: '📦' },
          { id: 'reviews', title: 'User Reviews', color: 'bg-neo-violet', icon: '⭐' }
        ].map(item => (
          <div 
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`${item.color} border-4 border-black p-6 shadow-brutal cursor-pointer hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col gap-4`}
          >
            <div className="text-6xl">{item.icon}</div>
            <h3 className="text-3xl font-black uppercase tracking-tighter">{item.title}</h3>
            <div className="mt-auto pt-4 border-t-4 border-black flex justify-between items-center group">
              <span className="font-bold uppercase text-sm">Manage Data</span>
              <span className="font-black text-2xl group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}