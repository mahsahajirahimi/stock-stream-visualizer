export default function ChartCard({ title, children }) {
    return (
      <div className="w-full rounded-lg bg-white shadow p-4">
        <h2 className="font-semibold mb-2">{title}</h2>
        {children}
      </div>
    );
  }
  