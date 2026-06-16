import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { stockCode, stockName } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `${stockName}(${stockCode}) 종목을 다음 기준으로 분석해주세요:
1. 종목발굴 점수 (0-100점)
2. 매수 타이밍 상태 (관찰/분할매수 가능/과열주의)
3. 예상 매수 구간
4. 매도 타이밍 상태 (보유/일부매도/전량매도 검토)
5. 핵심 위험요인
6. 투자 유의사항

JSON 형식으로 응답하세요.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 800,
    });

    const result = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analyze error:", error);
    return NextResponse.json({ error: "분석 오류" }, { status: 500 });
  }
}
