export default function ProjektLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
      {children}
    </div>
  );
}
