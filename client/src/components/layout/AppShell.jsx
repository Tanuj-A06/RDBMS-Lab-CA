export default function AppShell({ children, sidebar }) {
  return (
    <div className="flex min-h-screen bg-[#e5e7eb]">
      {sidebar}
      <main className="flex-1 overflow-x-hidden p-6 md:p-12">
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
