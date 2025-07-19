export default function ChartGrid({ children }) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {children}
      </div>
    );
  }
  