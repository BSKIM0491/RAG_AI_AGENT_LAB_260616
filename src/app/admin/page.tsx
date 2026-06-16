import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Shield, Database, Bot, Key } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-sky-500" />
          <h1 className="text-2xl font-bold text-gray-900">관리자 설정</h1>
        </div>

        {/* API Keys */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-sky-500" />
            <h2 className="text-base font-bold text-gray-900">API Key 관리</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "OpenAI API Key", env: "OPENAI_API_KEY", status: "연결됨" },
              { label: "ElevenLabs API Key", env: "ELEVENLABS_API_KEY", status: "연결됨" },
              { label: "Supabase URL", env: "NEXT_PUBLIC_SUPABASE_URL", status: "미설정" },
              { label: "뉴스 API Key", env: "NEWS_API_KEY", status: "미설정" },
              { label: "YouTube Data API Key", env: "YOUTUBE_API_KEY", status: "미설정" },
            ].map((item) => (
              <div key={item.env} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.env}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.status === "연결됨" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-500"}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Status */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-sky-500" />
            <h2 className="text-base font-bold text-gray-900">에이전트 상태</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: "오케스트레이션 에이전트", status: "대기중", last: "-" },
              { name: "정보수집 에이전트", status: "대기중", last: "-" },
            ].map((a) => (
              <div key={a.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                  <p className="text-xs text-gray-400">마지막 실행: {a.last}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-200 text-gray-500">{a.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DB Status */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-sky-500" />
            <h2 className="text-base font-bold text-gray-900">데이터베이스</h2>
          </div>
          <p className="text-sm text-gray-500">Supabase URL을 환경변수에 설정하면 자동으로 연결됩니다.</p>
          <div className="mt-3 p-3 bg-amber-50 rounded-xl">
            <p className="text-xs text-amber-700">⚠️ Supabase 프로젝트를 생성하고 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 Vercel 환경변수에 등록해주세요.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
