import { ArrowUpCircle } from "lucide-react";

const buys = [
  { name: "삼성전자", zone: "73,500 ~ 74,000", score: 85 },
  { name: "SK하이닉스", zone: "195,000 ~ 197,000", score: 82 },
  { name: "포스코퓨처엠", zone: "251,000 ~ 255,000", score: 74 },
];

export function BuySignals() {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <ArrowUpCircle className="w-5 h-5 text-emerald-500" />
        <h2 className="text-base font-bold text-gray-900">매수 후보</h2>
      </div>
      <div className="space-y-3">
        {buys.map((b) => (
          <div key={b.name} className="p-3 rounded-xl bg-emerald-50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-900">{b.name}</span>
              <span className="text-xs font-bold text-emerald-700">{b.score}점</span>
            </div>
            <p className="text-xs text-gray-500">검토구간 {b.zone}</p>
            <div className="mt-2 h-1.5 bg-emerald-100 rounded-full">
              <div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: `${b.score}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">분할매수 검토 · 손절선 설정 필수</p>
    </div>
  );
}
