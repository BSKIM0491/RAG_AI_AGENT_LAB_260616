import { ArrowDownCircle } from "lucide-react";

const sells = [
  { name: "카카오", reason: "5일선 이탈, 거래량 감소", level: "일부매도" },
  { name: "현대차", reason: "RSI 과열, 단기 급등", level: "매도 검토" },
];

const levelColor: Record<string, string> = {
  "일부매도": "badge-watch",
  "매도 검토": "badge-sell",
  "전량매도": "badge-sell",
};

export function SellSignals() {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <ArrowDownCircle className="w-5 h-5 text-red-400" />
        <h2 className="text-base font-bold text-gray-900">매도주의</h2>
      </div>
      <div className="space-y-3">
        {sells.map((s) => (
          <div key={s.name} className="p-3 rounded-xl bg-red-50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-900">{s.name}</span>
              <span className={levelColor[s.level]}>{s.level}</span>
            </div>
            <p className="text-xs text-gray-500">{s.reason}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">위험구간 · 투자 결정은 본인 책임</p>
    </div>
  );
}
