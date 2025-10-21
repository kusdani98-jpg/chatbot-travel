import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "Kamu adalah asisten AI yang membantu menjawab dengan bahasa Indonesia secara jelas dan informatif.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    return new Response(
      JSON.stringify({ reply: response.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error from Groq:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan saat memanggil API Groq" }),
      { status: 500 }
    );
  }
}
