import WallCalendar from './components/WallCalendar';

function App() {
  return (
    <div
      className="min-h-screen flex items-start md:items-center justify-center py-8 px-4"
      style={{
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)',
      }}
    >
      <WallCalendar />
    </div>
  );
}

export default App;
