"use client";
import Link from "next/link";
import { TrendingUp, Bell, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SignalNote</span>
            <span className="text-xl font-bold text-sky-500">AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors">대시보드</Link>
            <Link href="/discovery" className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors">종목발굴</Link>
            <Link href="/watchlist" className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors">관심종목</Link>
            <Link href="/report" className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors">AI 리포트</Link>
          </nav>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
            <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-500" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
