"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Volume2, VolumeX, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "오늘 관심종목 알려줘",
  "삼성전자 매수 타이밍은?",
  "지금 시장 어때?",
  "매도해야 할 종목 있어?",
];

export function AIChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "안녕하세요! SignalNote AI입니다. 종목발굴, 매수·매도 타이밍에 대해 질문해 주세요. 본 서비스는 AI 판단 보조 도구이며, 투자 결정은 사용자 본인 책임입니다.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voiceGender, setVoiceGender] = useState<"male" | "female">("female");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      const assistantMsg: Message = { role: "assistant", content: data.content };
      setMessages((prev) => [...prev, assistantMsg]);

      if (voiceEnabled) {
        await speakText(data.content, voiceGender);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "오류가 발생했습니다. 잠시 후 다시 시도해 주세요." }]);
    } finally {
      setLoading(false);
    }
  }

  async function speakText(text: string, gender: "male" | "female") {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, gender }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch {}
  }

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[560px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">SignalNote AI</p>
            <p className="text-xs text-emerald-500">온라인</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceGender(g => g === "male" ? "female" : "male")}
            className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            {voiceGender === "male" ? "남" : "여"}
          </button>
          <button onClick={() => setVoiceEnabled(v => !v)} className="p-1.5 rounded-lg hover:bg-gray-100">
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-sky-500" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === "assistant" ? "bg-sky-100" : "bg-gray-100"}`}>
              {m.role === "assistant" ? <Bot className="w-4 h-4 text-sky-500" /> : <User className="w-4 h-4 text-gray-500" />}
            </div>
            <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${m.role === "assistant" ? "bg-gray-50 text-gray-800" : "bg-sky-500 text-white"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center">
              <Bot className="w-4 h-4 text-sky-500" />
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => sendMessage(s)} className="text-xs px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder="종목이나 시장에 대해 질문하세요..."
            className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="p-2 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-200 text-white rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
