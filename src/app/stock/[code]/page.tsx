import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StockDetail } from "@/components/stock/StockDetail";
import { AIChatButton } from "@/components/ai/AIChatButton";

export default async function StockPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StockDetail code={code} />
      </main>
      <Footer />
      <AIChatButton />
    </div>
  );
}
