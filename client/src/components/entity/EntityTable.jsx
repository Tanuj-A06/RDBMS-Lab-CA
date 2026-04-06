import NeoButton from '../ui/NeoButton';

export default function EntityTable({ data, schema, onEdit, onDelete, colorClass = 'bg-neo-yellow' }) {
  if (!data?.length) {
    return (
      <div className="p-12 text-center border-4 border-black bg-white shadow-brutal animate-in zoom-in-95 duration-300">
        <h3 className="text-3xl font-black uppercase mb-4 italic">No Records Found</h3>
        <p className="font-bold opacity-70 mb-6 uppercase tracking-wider">Start by adding a new entry to this entity.</p>
      </div>
    );
  }

  const columns = Object.keys(schema);

  return (
    <div className="overflow-x-auto border-4 border-black shadow-brutal bg-white">
      <table className="w-full text-left border-collapse">
        <thead className="bg-black text-white">
          <tr>
            {columns.map(col => (
              <th key={col} className="p-4 border-r border-white/20 font-black uppercase text-[10px] tracking-widest">{col.replace(/_/g, ' ')}</th>
            ))}
            <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="border-b-4 border-black hover:bg-gray-50 transition-colors group">
              {columns.map(col => (
                <td key={col} className="p-4 border-r-2 border-black font-bold text-xs">
                  {typeof row[col] === 'boolean' ? (
                    <span className={`px-2 py-1 border-2 border-black font-black text-[10px] uppercase ${row[col] ? 'bg-neo-green' : 'bg-red-400'}`}>
                      {row[col] ? 'Yes' : 'No'}
                    </span>
                  ) : (
                    <span className="truncate max-w-[200px] block">{row[col] || 'N/A'}</span>
                  )}
                </td>
              ))}
              <td className="p-4 flex gap-2 justify-center">
                <button 
                  onClick={() => onEdit(row)} 
                  className="bg-neo-cyan border-2 border-black px-3 py-1 font-black text-[10px] uppercase hover:translate-x-[1px] hover:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(row.id)} 
                  className="bg-red-500 text-white border-2 border-black px-3 py-1 font-black text-[10px] uppercase hover:translate-x-[1px] hover:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all"
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
