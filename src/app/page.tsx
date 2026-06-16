import { MarketStatus } from "@/components/dashboard/MarketStatus";
import { StockDiscovery } from "@/components/dashboard/StockDiscovery";
import { BuySignals } from "@/components/dashboard/BuySignals";
import { SellSignals } from "@/components/dashboard/SellSignals";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIChatButton } from "@/components/ai/AIChatButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <MarketStatus />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StockDiscovery />
          </div>
          <div className="space-y-6">
            <BuySignals />
            <SellSignals />
          </div>
        </div>
      </main>
      <Footer />
      <AIChatButton />
    </div>
  );
}
