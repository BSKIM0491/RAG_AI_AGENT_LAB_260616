import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIChatButton } from "@/components/ai/AIChatButton";
import { FileText, TrendingUp, AlertTriangle, BarChart2 } from "lucide-react";

const sectors = [
  { name: "반도체", strength: 85, trend: "강세" },
  { name: "2차전지", strength: 42, trend: "약세" },
  { name: "바이오", strength: 61, trend: "중립" },
  { name: "자동차", strength: 70, trend: "강세" },
  { name: "금융", strength: 55, trend: "중립" },
];

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-sky-500" />
          <h1 className="text-2xl font-bold text-gray-900">AI 일일 리포트</h1>
          <span className="text-sm text-gray-400 ml-auto">AI 판단 보조 · 투자 추천 아님</span>
        </div>

        {/* 시장 요약 */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-sky-500" />
            <h2 className="text-base font-bold text-gray-900">오늘의 시장 요약</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            코스피가 반도체 업종의 강세에 힘입어 전일 대비 1.23% 상승하며 2,487선을 회복했습니다.
            외국인이 4거래일 연속 순매수를 이어가며 지수 상승을 견인했고,
            나스닥 강세 영향으로 반도체·IT 업종이 시장을 주도했습니다.
          </p>
        </div>

        {/* 업종별 강도 */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-sky-500" />
            <h2 className="text-base font-bold text-gray-900">업종별 강도</h2>
          </div>
          <div className="space-y-3">
            {sectors.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${s.strength >= 70 ? "text-emerald-600" : s.strength >= 50 ? "text-amber-600" : "text-red-500"}`}>{s.trend}</span>
                    <span className="text-xs text-gray-400">{s.strength}점</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className={`h-2 rounded-full transition-all ${s.strength >= 70 ? "bg-emerald-500" : s.strength >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${s.strength}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 위험 요인 */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-gray-900">오늘의 위험 요인</h2>
          </div>
          <ul className="space-y-2">
            {[
              "미국 CPI 발표 예정 — 시장 변동성 확대 가능",
              "2차전지 업종 수급 악화 지속",
              "달러 강세로 외국인 매도 전환 가능성",
            ].map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
      <AIChatButton />
    </div>
  );
}
