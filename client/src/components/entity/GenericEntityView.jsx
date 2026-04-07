import { useState } from 'react';
import useCrud from '../../hooks/useCrud';
import EntityTable from './EntityTable';
import EntityForm from './EntityForm';
import NeoButton from '../ui/NeoButton';
import { Plus, LayoutTemplate } from 'lucide-react';

export default function GenericEntityView({ entity, title, schema, colorClass = 'bg-neo-yellow' }) {
  const { data, loading, error, createRecord, updateRecord, deleteRecord } = useCrud(entity);
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [editItem, setEditItem] = useState(null);

  const handleCreate = () => {
    setEditItem(null);
    setView('form');
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setView('form');
  };

  const handleSubmit = async (formData) => {
    try {
      if (editItem) {
        await updateRecord(editItem.id, formData);
      } else {
        await createRecord(formData);
      }
      setView('list');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Generate aggregate stats based on data
  const totalRecords = data?.length || 0;
  const latestId = data?.length > 0 ? Math.max(...data.map(d => parseInt(d.id, 10) || 0)) : 0;
  
  // Custom stats based on entity type for some flavor
  let specialStatTitle = "Active Status";
  let specialStatValue = "100%";
  if (entity === 'orders') {
    specialStatTitle = "Pending";
    specialStatValue = data?.filter(d => d.status === 'pending' || d.status === 'Pending').length || 0;
  } else if (entity === 'dishes') {
    specialStatTitle = "Avg Price";
    const prices = data?.map(d => parseFloat(d.price) || 0) || [];
    specialStatValue = prices.length ? "₹" + (prices.reduce((a,b) => a+b, 0) / prices.length).toFixed(2) : "$0.00";
  }

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-black p-6 border-4 border-black text-white shadow-brutal gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 ${colorClass} text-black flex items-center justify-center border-4 border-black shrink-0`}>
            <LayoutTemplate size={32} />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">{title}</h2>
            <p className="text-[10px] md:text-xs font-bold opacity-60 uppercase tracking-widest mt-1">
              {view === 'list' ? `Showing ${data?.length || 0} Records` : 'Creating / Editing Entry'}
            </p>
          </div>
        </div>
        {view === 'list' && (
          <NeoButton variant="green" onClick={handleCreate} className="w-full md:w-auto flex items-center justify-center gap-2 text-sm">
            <Plus size={20} strokeWidth={3} />
            Add {title.replace(/s$/i, '')}
          </NeoButton>
        )}
      </div>

      {/* Aggregate Cards */}
      {view === 'list' && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center">
            <span className="text-xs uppercase font-black tracking-widest text-gray-500">Total {title}</span>
            <span className="text-4xl font-black mt-2">{totalRecords}</span>
          </div>
          {/* <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center">
            <span className="text-xs uppercase font-black tracking-widest text-gray-500">Highest ID</span>
            <span className="text-4xl font-black mt-2">#{latestId}</span>
          </div> */}
          <div className={`${colorClass} border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center`}>
            <span className="text-xs uppercase font-black tracking-widest text-black/70">{specialStatTitle}</span>
            <span className="text-4xl font-black mt-2">{specialStatValue}</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 bg-red-400 text-black border-4 border-black font-black uppercase text-sm shadow-brutal flex items-center justify-between animate-in slide-in-from-left-4">
          <span>Error Found: {error}</span>
          <button onClick={() => window.location.reload()} className="underline text-xs">Reload App</button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative">
        {loading ? (
          <div className="p-24 text-center border-4 border-black bg-white shadow-brutal animate-pulse">
            <div className="inline-block w-12 h-12 border-4 border-black border-t-transparent animate-spin mb-4"></div>
            <p className="italic font-black uppercase text-2xl tracking-widest">Fetching {title}...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {view === 'list' ? (
              <EntityTable 
                data={data} 
                schema={schema} 
                onEdit={handleEdit} 
                onDelete={deleteRecord} 
                colorClass={colorClass}
              />
            ) : (
              <EntityForm 
                schema={schema} 
                initialData={editItem} 
                onSubmit={handleSubmit} 
                onCancel={() => setView('list')}
                title={title.replace(/s$/i, '')}
                colorClass={colorClass}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
