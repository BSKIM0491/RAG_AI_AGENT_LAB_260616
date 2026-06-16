export interface CollectorInput {
  stockCode?: string;
  market?: "KR" | "US" | "ALL";
  tasks: ("price" | "news" | "disclosure" | "supply")[];
}

export interface CollectorOutput {
  prices?: Record<string, number>;
  news?: { title: string; sentiment: string; url: string; publishedAt: string }[];
  disclosures?: { title: string; type: string; date: string }[];
  supply?: { foreign: number; institution: number; individual: number };
  collectedAt: string;
}

export async function runCollectorAgent(input: CollectorInput): Promise<CollectorOutput> {
  const results: CollectorOutput = { collectedAt: new Date().toISOString() };

  for (const task of input.tasks) {
    switch (task) {
      case "news":
        results.news = await collectNews(input.stockCode);
        break;
      case "price":
        results.prices = await collectPrice(input.stockCode);
        break;
      case "supply":
        results.supply = await collectSupply(input.stockCode);
        break;
    }
  }

  return results;
}

async function collectNews(stockCode?: string): Promise<CollectorOutput["news"]> {
  // TODO: 뉴스 API 연동 (NewsAPI, 네이버 뉴스 등)
  return [
    { title: `${stockCode ?? "시장"} 관련 뉴스 수집 중`, sentiment: "neu", url: "#", publishedAt: new Date().toISOString() },
  ];
}

async function collectPrice(stockCode?: string): Promise<CollectorOutput["prices"]> {
  // TODO: 주가 API 연동 (한국투자증권 API, KIS Developers 등)
  return { close: 0, open: 0, high: 0, low: 0, volume: 0 };
}

async function collectSupply(stockCode?: string): Promise<CollectorOutput["supply"]> {
  // TODO: 수급 데이터 API 연동
  return { foreign: 0, institution: 0, individual: 0 };
}
