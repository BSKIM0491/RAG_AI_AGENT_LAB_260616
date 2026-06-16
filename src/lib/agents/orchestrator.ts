import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface OrchestratorInput {
  query: string;
  stockCode?: string;
  stockName?: string;
  ragContext?: string;
}

export interface OrchestratorOutput {
  discovery?: { score: number; grade: string; reason: string; risks: string[] };
  buySignal?: { status: string; zone: string; stopLoss: string };
  sellSignal?: { status: string; reason: string };
  summary: string;
  disclaimer: string;
}

export async function runOrchestratorAgent(input: OrchestratorInput): Promise<OrchestratorOutput> {
  const systemPrompt = `당신은 SignalNote AI의 오케스트레이션 에이전트입니다.
주식 종목 분석 요청을 받아 종목발굴·매수 타이밍·매도 타이밍을 분석합니다.

RAG 컨텍스트(있는 경우):
${input.ragContext ?? "없음"}

분석 기준:
- 종목발굴 점수: 거래량(20)+추세(20)+수급(15)+뉴스(15)+업종(15)+리스크(15)
- 매수 신호: 80점 이상=분할매수 가능, 60-79=관찰, 40-59=보류
- 매도 신호: 급등+거래량감소=일부매도, 지지선 이탈=매도 검토

반드시 JSON 형식으로 응답하세요.
투자 추천 표현 금지. 판단 보조·참고 목적 표현 사용.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `${input.stockName ?? ""}(${input.stockCode ?? ""}) 분석: ${input.query}` },
    ],
    response_format: { type: "json_object" },
    max_tokens: 1000,
  });

  const raw = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
  return {
    ...raw,
    disclaimer: "본 분석은 AI 판단 보조 정보입니다. 투자 결정은 사용자 본인 책임입니다.",
  };
}
