import { useState } from 'react';
import NeoButton from '../ui/NeoButton';
import NeoInput from '../ui/NeoInput';

export default function EntityForm({ schema, initialData, onSubmit, onCancel, title, colorClass = 'bg-neo-green' }) {
  const isNew = initialData?._isNew;
  const [formData, setFormData] = useState(() => {
    if (!initialData) return {};
    const { _isNew, ...rest } = initialData;
    return rest;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { _isNew, ...cleanData } = formData;
    onSubmit(cleanData);
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`p-8 border-4 border-black shadow-brutal bg-white max-w-2xl mx-auto animate-in slide-in-from-top-4 duration-300`}>
      <h2 className={`text-2xl font-black uppercase mb-8 border-b-4 border-black pb-4 ${colorClass} p-4 -mx-8 -mt-8`}>
        {initialData && !isNew ? `Edit ${title}` : `Add New ${title}`}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(schema).map(([key, config]) => (
            <div key={key}>
              {config.type === 'boolean' ? (
                <div className="flex flex-col gap-2">
                  <label className="font-black uppercase text-xs">{key.replace(/_/g, ' ')}</label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border-4 border-black bg-white hover:bg-neo-yellow transition-colors font-black uppercase text-sm">
                    <input 
                      type="checkbox" 
                      className="w-8 h-8 border-4 border-black appearance-none checked:bg-black transition-colors"
                      checked={!!formData[key]} 
                      onChange={(e) => handleChange(key, e.target.checked)}
                    />
                    <span>{formData[key] ? 'Enabled / Completed' : 'Disabled / Pending'}</span>
                  </label>
                </div>
              ) : (
                <NeoInput
                  label={key.replace(/_/g, ' ')}
                  type={config.type || 'text'}
                  value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  disabled={key === 'id'}
                  required
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-6 mt-6 border-t-4 border-black">
          <NeoButton variant="white" onClick={onCancel} className="px-6 text-sm">Cancel</NeoButton>
          <NeoButton variant="green" type="submit" className="px-10 text-sm">Save Record</NeoButton>
        </div>
      </form>
    </div>
  );
}
