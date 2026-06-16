import { NextRequest, NextResponse } from "next/server";

const VOICE_IDS = {
  male: "pNInz6obpgDQGcFmaJgB",   // ElevenLabs Adam
  female: "EXAVITQu4vr4xnSDxMaL", // ElevenLabs Bella
};

export async function POST(req: NextRequest) {
  try {
    const { text, gender = "female" } = await req.json();
    const voiceId = VOICE_IDS[gender as keyof typeof VOICE_IDS] ?? VOICE_IDS.female;

    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "TTS 오류" }, { status: 500 });
    }

    const audioBuffer = await res.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return NextResponse.json({ error: "TTS 오류" }, { status: 500 });
  }
}
