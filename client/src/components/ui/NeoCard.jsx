export default function NeoCard({ children, className = '', title, variant = 'white' }) {
  const bgVariants = {
    white: 'bg-white',
    yellow: 'bg-neo-yellow',
    pink: 'bg-neo-pink',
    cyan: 'bg-neo-cyan',
    green: 'bg-neo-green',
  };
  
  return (
    <div className={`border-4 border-black p-6 shadow-brutal transition-all duration-150 ${bgVariants[variant] || bgVariants.white} ${className}`}>
      {title && <h2 className="mb-4 text-2xl font-black uppercase border-b-4 border-black pb-2">{title}</h2>}
      {children}
    </div>
  );
}
