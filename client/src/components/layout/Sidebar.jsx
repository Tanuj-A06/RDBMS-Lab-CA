import { Utensils, Users, Truck, Disc, ShoppingBag, Star, Home } from 'lucide-react';

const MENU_ITEMS = [
  { id: 'landing', label: 'Dashboard', icon: Home, color: 'bg-white' },
  { id: 'restaurants', label: 'Restaurants', icon: Utensils, color: 'bg-neo-yellow' },
  { id: 'customers', label: 'Customers', icon: Users, color: 'bg-neo-pink' },
  { id: 'delivery_partners', label: 'Partners', icon: Truck, color: 'bg-neo-cyan' },
  { id: 'dishes', label: 'Dishes', icon: Disc, color: 'bg-neo-green' },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, color: 'bg-neo-orange' },
  { id: 'reviews', label: 'Reviews', icon: Star, color: 'bg-neo-violet' },
];

export default function Sidebar({ activeEntity, onSelect }) {
  return (
    <aside className="w-64 h-screen border-r-4 border-black bg-white flex flex-col p-4 gap-4 sticky top-0 z-50">
      <div className="flex items-center gap-2 border-b-4 border-black pb-4 mb-2 cursor-pointer hover:-translate-y-1 transition-all" onClick={() => onSelect('landing')}>
        <div className="w-10 h-10 bg-black flex items-center justify-center shrink-0">
          <Utensils className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-black uppercase leading-none">Foodie<br/>Admin</h1>
      </div>
      
      <nav className="flex flex-col gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeEntity === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-3 p-3 border-4 border-black font-black uppercase text-xs transition-all duration-75 
                ${isActive ? `${item.color} translate-x-[4px] translate-y-[4px] shadow-none` : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
              `}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto border-t-4 border-black pt-4">
        <p className="text-[10px] font-black uppercase opacity-50">Admin Panel</p>
      </div>
    </aside>
  );
}
