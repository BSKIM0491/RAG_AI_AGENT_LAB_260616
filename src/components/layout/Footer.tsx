export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold text-gray-900">SignalNote AI</p>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            ⚠️ 본 서비스는 AI 기반 교육 및 참고 목적의 판단 보조 도구입니다.
            제공되는 정보는 투자 추천이나 투자자문이 아니며, 모든 투자 결정과 그에 따른 손익은 사용자 본인의 책임입니다.
            투자 전 반드시 전문가와 상담하시기 바랍니다.
          </p>
          <p className="text-xs text-gray-400">© 2025 SignalNote AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
