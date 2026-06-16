import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `당신은 SignalNote AI의 주식 분석 보조 에이전트입니다.
역할: 종목발굴, 매수 타이밍, 매도 타이밍에 대한 AI 판단 보조 정보를 제공합니다.

규칙:
- 모든 분석은 판단 보조 목적이며 투자 추천이 아님을 명시
- "반드시 오른다", "지금 사라", "확정 수익" 등 단정적 표현 금지
- "분할매수 검토", "위험구간", "관찰 필요" 등 신중한 표현 사용
- 근거, 위험요인, 손절 기준을 함께 제시
- 한국 주식 시장 중심으로 답변
- 답변은 간결하게 3~5문장으로 유지`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content ?? "분석 중 오류가 발생했습니다.";
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ content: "서비스 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
