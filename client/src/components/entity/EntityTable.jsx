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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((row, idx) => (
        <div 
          key={row.id || idx} 
          className="bg-white border-4 border-black shadow-brutal hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col"
        >
          <div className={`${colorClass} border-b-4 border-black p-4 flex justify-between items-center`}>
            <span className="font-black text-xl tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis">
              ID: {row.id || '#' + (idx + 1)}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => onEdit(row)} 
                className="bg-white border-2 border-black w-8 h-8 flex items-center justify-center font-black text-lg hover:bg-black hover:text-white hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                title="Edit"
              >
                ✎
              </button>
              <button 
                onClick={() => onDelete(row.id)} 
                className="bg-red-500 text-white border-2 border-black w-8 h-8 flex items-center justify-center font-black text-lg hover:bg-black hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                title="Delete"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-4 flex-1 flex flex-col gap-3">
            {columns.map(col => {
              if (col === 'id') return null; // Already shown in header
              
              return (
                <div key={col} className="flex flex-col border-b-2 border-black/10 pb-2 last:border-0 last:pb-0">
                  <span className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1">
                    {col.replace(/_/g, ' ')}
                  </span>
                  <div className="font-bold text-sm break-words">
                    {typeof row[col] === 'boolean' ? (
                      <span className={`inline-block px-2 py-1 border-2 border-black font-black text-[10px] uppercase ${row[col] ? 'bg-neo-green' : 'bg-red-400'}`}>
                        {row[col] ? 'Yes' : 'No'}
                      </span>
                    ) : (
                      <span className="truncate whitespace-normal">
                        {row[col] !== null && row[col] !== undefined ? String(row[col]) : (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
