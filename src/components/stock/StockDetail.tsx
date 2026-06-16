"use client";
import { useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, BookOpen, ChevronRight } from "lucide-react";

const MOCK_STOCK: Record<string, { name: string; price: string; change: string; up: boolean; buySignal: string; sellSignal: string; score: number; buyZone: string; stopLoss: string; reasons: string[]; risks: string[]; news: { title: string; sentiment: "pos" | "neg" | "neu"; time: string }[] }> = {
  "005930": {
    name: "삼성전자",
    price: "74,300",
    change: "+3.2%",
    up: true,
    buySignal: "분할매수 가능",
    sellSignal: "보유",
    score: 85,
    buyZone: "73,500 ~ 74,000",
    stopLoss: "71,000 이탈 시",
    reasons: ["거래량 전일 대비 230% 증가", "20일선·60일선 정배열 유지", "기관 3거래일 연속 순매수", "반도체 업황 개선 뉴스"],
    risks: ["단기 급등에 따른 RSI 과열 우려", "글로벌 지수 조정 가능성", "환율 변동 리스크"],
    news: [
      { title: "삼성전자, HBM4 양산 일정 앞당긴다", sentiment: "pos", time: "2시간 전" },
      { title: "외국인 삼성전자 3000억 순매수", sentiment: "pos", time: "4시간 전" },
      { title: "반도체 업황 2분기 바닥 확인", sentiment: "pos", time: "6시간 전" },
    ],
  },
};

const DEFAULT_STOCK = {
  name: "종목",
  price: "0",
  change: "0%",
  up: true,
  buySignal: "관찰",
  sellSignal: "보유",
  score: 50,
  buyZone: "-",
  stopLoss: "-",
  reasons: ["데이터 수집 중"],
  risks: ["데이터 수집 중"],
  news: [],
};

export function StockDetail({ code }: { code: string }) {
  const stock = MOCK_STOCK[code] ?? { ...DEFAULT_STOCK, name: `종목 ${code}` };
  const [showRag, setShowRag] = useState(false);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{stock.name}</h1>
            <p className="text-gray-400 text-sm mt-0.5">{code}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">{stock.price}</p>
            <div className={`flex items-center justify-end gap-1 mt-1 ${stock.up ? "text-emerald-600" : "text-red-500"}`}>
              {stock.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-lg font-semibold">{stock.change}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 신호 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 매수 신호 */}
          <div className="card">
            <h2 className="text-base font-bold text-gray-900 mb-3">매수 타이밍</h2>
            <div className="flex items-center justify-between mb-3">
              <span className="badge-buy text-sm">{stock.buySignal}</span>
              <div className="text-right">
                <p className="text-xs text-gray-500">AI 점수</p>
                <p className="text-xl font-bold text-sky-600">{stock.score}점</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">검토 구간</span>
                <span className="font-semibold text-gray-900">{stock.buyZone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">손절 기준</span>
                <span className="font-semibold text-red-500">{stock.stopLoss}</span>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-sky-500 rounded-full transition-all" style={{ width: `${stock.score}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">{stock.score}/100점</p>
          </div>

          {/* 매도 신호 */}
          <div className="card">
            <h2 className="text-base font-bold text-gray-900 mb-3">매도 타이밍</h2>
            <span className="badge-hold">{stock.sellSignal}</span>
          </div>

          {/* 뉴스 */}
          <div className="card">
            <h2 className="text-base font-bold text-gray-900 mb-3">관련 뉴스</h2>
            <div className="space-y-2">
              {stock.news.map((n, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${n.sentiment === "pos" ? "bg-emerald-400" : n.sentiment === "neg" ? "bg-red-400" : "bg-gray-300"}`} />
                  <span className="text-sm text-gray-700 flex-1">{n.title}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 사이드 */}
        <div className="space-y-4">
          {/* 발굴 근거 */}
          <div className="card">
            <h2 className="text-base font-bold text-gray-900 mb-3">발굴 근거</h2>
            <ul className="space-y-2">
              {stock.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <ChevronRight className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* 위험요인 */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-base font-bold text-gray-900">위험요인</h2>
            </div>
            <ul className="space-y-2">
              {stock.risks.map((r, i) => (
                <li key={i} className="text-sm text-gray-600">{r}</li>
              ))}
            </ul>
          </div>

          {/* RAG 근거 */}
          <div className="card">
            <button
              onClick={() => setShowRag(!showRag)}
              className="flex items-center gap-2 w-full text-left"
            >
              <BookOpen className="w-4 h-4 text-sky-500" />
              <span className="text-base font-bold text-gray-900">AI 분석 근거</span>
            </button>
            {showRag && (
              <div className="mt-3 text-sm text-gray-600 space-y-2">
                <p className="p-2 bg-sky-50 rounded-lg">📚 주식단테: "거래량이 평균의 2배 이상일 때 단기 추세 확인"</p>
                <p className="p-2 bg-sky-50 rounded-lg">📊 차트 기준: "이동평균 정배열 + 신고가 돌파 = 강한 매수 신호"</p>
                <p className="p-3 bg-gray-50 rounded-lg text-xs text-gray-400">본 분석은 RAG 기반 AI 판단 보조 정보입니다. 투자 결정은 본인 책임입니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
