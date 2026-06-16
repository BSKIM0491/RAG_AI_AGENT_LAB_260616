import { NextResponse } from "next/server";
import { runCollectorAgent } from "@/lib/agents/collector";

export async function GET() {
  try {
    const result = await runCollectorAgent({
      market: "KR",
      tasks: ["price", "news", "supply"],
    });

    return NextResponse.json({ ok: true, collectedAt: result.collectedAt });
  } catch (error) {
    console.error("Cron collect-close error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
