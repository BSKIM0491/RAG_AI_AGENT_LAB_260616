"use client";
import { useState } from "react";
import { Bot, X, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { AIChatWindow } from "./AIChatWindow";

export function AIChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <AIChatWindow onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50"
        aria-label="AI 상담"
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </>
  );
}
