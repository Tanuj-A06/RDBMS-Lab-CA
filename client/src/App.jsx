import { useState } from 'react';
import AppShell from './components/layout/AppShell';
import Sidebar from './components/layout/Sidebar';
import GenericEntityView from './components/entity/GenericEntityView';
import LandingPage from './components/layout/LandingPage';
import './App.css';

const ENTITIES = {
  landing: {
    title: 'Dashboard',
    colorClass: 'bg-white'
  },
  restaurants: {
    title: 'Restaurants',
    colorClass: 'bg-neo-yellow',
    schema: {
      id: { type: 'number' },
      name: { type: 'text' },
      contact: { type: 'text' },
      email: { type: 'email' },
      address: { type: 'text' }
    }
  },
  customers: {
    title: 'Customers',
    colorClass: 'bg-neo-pink',
    schema: {
      id: { type: 'number' },
      name: { type: 'text' },
      contact: { type: 'text' },
      email: { type: 'email' },
      password_hash: { type: 'text' },
      address: { type: 'text' }
    }
  },
  delivery_partners: {
    title: 'Delivery Partners',
    colorClass: 'bg-neo-cyan',
    schema: {
      id: { type: 'number' },
      name: { type: 'text' },
      contact: { type: 'text' },
      email: { type: 'email' },
      vehicle_no: { type: 'text' }
    }
  },
  dishes: {
    title: 'Dishes',
    colorClass: 'bg-neo-green',
    schema: {
      id: { type: 'number' },
      restaurent_id: { type: 'number' }, // NOTE: Typo preserved to match backend API
      name: { type: 'text' },
      price: { type: 'number' },
      description: { type: 'text' },
      quantity: { type: 'text' }
    }
  },
  orders: {
    title: 'Orders',
    colorClass: 'bg-neo-orange',
    schema: {
      id: { type: 'number' },
      restaurent_id: { type: 'number' },
      customer_id: { type: 'number' },
      delivery_partners_id: { type: 'number' },
      status: { type: 'text' },
      payment: { type: 'boolean' }
    }
  },
  reviews: {
    title: 'Reviews',
    colorClass: 'bg-neo-violet',
    schema: {
      id: { type: 'number' },
      restaurent_id: { type: 'number' },
      customer_id: { type: 'number' },
      description: { type: 'text' }
    }
  }
};

function App() {
  const [activeEntity, setActiveEntity] = useState('landing');
  const entityConfig = ENTITIES[activeEntity];

  return (
    <AppShell 
      sidebar={<Sidebar activeEntity={activeEntity === 'landing' ? null : activeEntity} onSelect={setActiveEntity} />}
    >
      {activeEntity === 'landing' ? (
        <LandingPage onNavigate={setActiveEntity} />
      ) : (
        <GenericEntityView 
          key={activeEntity}
          entity={activeEntity}
          title={entityConfig.title}
          schema={entityConfig.schema}
          colorClass={entityConfig.colorClass}
        />
      )}
      
      {/* Decorative Ticks or Footer */}
      <div className="flex justify-between items-center opacity-20 pointer-events-none mt-12 py-8 border-t-4 border-black border-dashed">
        <span className="font-black italic uppercase tracking-tighter text-4xl">System Stable</span>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-black"></div>
          <div className="w-12 h-12 bg-neo-yellow"></div>
          <div className="w-12 h-12 bg-neo-pink"></div>
        </div>
      </div>
    </AppShell>
  );
}

export default App;
