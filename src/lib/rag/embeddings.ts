import OpenAI from "openai";
import { getServiceClient } from "@/lib/supabase";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

export async function searchRAG(query: string, limit = 5): Promise<string[]> {
  try {
    const supabase = getServiceClient();
    const embedding = await createEmbedding(query);

    const { data, error } = await supabase.rpc("match_rag_documents", {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: limit,
    });

    if (error || !data) return [];
    return data.map((d: { chunk_text: string }) => d.chunk_text);
  } catch {
    return [];
  }
}

export async function upsertDocument(
  title: string,
  content: string,
  metadata: Record<string, unknown>
) {
  const supabase = getServiceClient();
  const chunks = chunkText(content, 800);

  for (const chunk of chunks) {
    const embedding = await createEmbedding(chunk);
    await supabase.from("rag_embeddings").insert({
      chunk_text: chunk,
      embedding,
      metadata: { ...metadata, title },
    });
  }
}

function chunkText(text: string, size: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}
