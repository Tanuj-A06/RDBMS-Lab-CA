export default function NeoBadge({ children, variant = 'cyan', className = '' }) {
  const variants = {
    yellow: 'bg-neo-yellow',
    pink: 'bg-neo-pink',
    cyan: 'bg-neo-cyan',
    green: 'bg-neo-green',
    white: 'bg-white',
    black: 'bg-black text-white'
  };
  return (
    <span className={`inline-block border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ${variants[variant] || variants.cyan} ${className}`}>
      {children}
    </span>
  );
}
