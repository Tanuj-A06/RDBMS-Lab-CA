export default function NeoButton({ children, onClick, variant = 'yellow', className = '', type = 'button', disabled = false }) {
  const variants = {
    yellow: 'bg-neo-yellow',
    pink: 'bg-neo-pink',
    cyan: 'bg-neo-cyan',
    green: 'bg-neo-green',
    red: 'bg-red-500',
    white: 'bg-white',
    black: 'bg-black text-white'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`neo-press border-4 border-black px-4 py-2 font-black uppercase shadow-brutal disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant] || variants.yellow} ${className}`}
    >
      {children}
    </button>
  );
}
