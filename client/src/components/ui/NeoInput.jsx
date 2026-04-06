export default function NeoInput({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  required = false, 
  name,
  disabled = false
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="font-black uppercase tracking-tight text-sm">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="border-4 border-black p-3 font-bold focus:bg-neo-yellow outline-none transition-colors disabled:opacity-50"
      />
    </div>
  );
}
