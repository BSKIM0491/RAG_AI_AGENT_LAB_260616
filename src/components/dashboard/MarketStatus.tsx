import { TrendingUp, TrendingDown, Minus, Globe, Activity } from "lucide-react";

const markets = [
  { name: "KOSPI", value: "2,487.32", change: "+1.23%", up: true },
  { name: "KOSDAQ", value: "712.45", change: "+0.87%", up: true },
  { name: "S&P 500", value: "5,832.10", change: "-0.34%", up: false },
  { name: "NASDAQ", value: "19,102.45", change: "+0.12%", up: true },
  { name: "달러/원", value: "1,342.50", change: "-2.30", up: false },
];

export function MarketStatus() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-sky-500" />
          <h2 className="text-lg font-bold text-gray-900">오늘의 시장</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-600 font-medium">장중</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {markets.map((m) => (
          <div key={m.name} className="text-center p-3 rounded-xl bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">{m.name}</p>
            <p className="text-base font-bold text-gray-900">{m.value}</p>
            <div className={`flex items-center justify-center gap-0.5 mt-1 ${m.up ? "text-emerald-600" : "text-red-500"}`}>
              {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-xs font-semibold">{m.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
