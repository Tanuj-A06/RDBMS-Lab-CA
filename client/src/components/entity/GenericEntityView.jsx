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
