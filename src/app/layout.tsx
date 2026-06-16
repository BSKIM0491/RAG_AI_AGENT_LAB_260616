import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalNote AI — 종목발굴·매수·매도 타이밍",
  description: "AI가 분석하는 주식 종목발굴, 매수 타이밍, 매도 타이밍 서비스. 본 서비스는 교육 및 참고 목적이며 투자 결정은 사용자 본인 책임입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
