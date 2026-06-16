import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";

const stocks = [
  {
    code: "005930",
    name: "삼성전자",
    price: "74,300",
    change: "+3.2%",
    grade: "A",
    reason: "거래량 급증, 반도체 업황 개선 뉴스, 기관 순매수",
    risk: "단기 급등 주의",
    signal: "분할매수 가능",
  },
  {
    code: "000660",
    name: "SK하이닉스",
    price: "198,500",
    change: "+4.1%",
    grade: "A",
    reason: "HBM 수요 증가, 외국인 대량 매수, 신고가 돌파",
    risk: "RSI 과열 구간",
    signal: "분할매수 가능",
  },
  {
    code: "035420",
    name: "NAVER",
    price: "182,000",
    change: "+1.8%",
    grade: "B",
    reason: "AI 검색 서비스 성장, 박스권 상단 돌파 시도",
    risk: "지수 조정 가능성",
    signal: "관찰",
  },
  {
    code: "051910",
    name: "LG화학",
    price: "312,500",
    change: "+2.3%",
    grade: "B",
    reason: "배터리 소재 수주 증가, 이동평균 정배열",
    risk: "원자재 가격 변동",
    signal: "관찰",
  },
];

const gradeColor: Record<string, string> = {
  A: "bg-sky-500 text-white",
  B: "bg-sky-100 text-sky-700",
  C: "bg-gray-100 text-gray-600",
};

export function StockDiscovery() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-500" />
          <h2 className="text-lg font-bold text-gray-900">AI 종목발굴</h2>
        </div>
        <span className="text-xs text-gray-400">AI 판단 보조 · 투자 추천 아님</span>
      </div>
      <div className="space-y-3">
        {stocks.map((s) => (
          <Link key={s.code} href={`/stock/${s.code}`} className="block p-4 rounded-xl border border-gray-100 hover:border-sky-200 hover:bg-sky-50/30 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${gradeColor[s.grade]}`}>
                  {s.grade}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{s.name}</span>
                    <span className="text-xs text-gray-400">{s.code}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{s.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{s.price}</p>
                <p className="text-sm text-emerald-600 font-semibold">{s.change}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                <span className="text-xs text-gray-500">{s.risk}</span>
              </div>
              <span className="badge-buy">{s.signal}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
