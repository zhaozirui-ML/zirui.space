import { createPortfolioChatReply } from "../../../src/site/chatbot/portfolio-chat-engine";

export const runtime = "nodejs";

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter(
      (message) =>
        message &&
        (message.role === "assistant" || message.role === "user") &&
        typeof message.content === "string" &&
        message.content.trim()
    )
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const language = body?.language === "en" ? "en" : "zh";
    const messages = normalizeMessages(body?.messages);
    const pathname = typeof body?.pathname === "string" ? body.pathname : "/";
    const question = typeof body?.question === "string" ? body.question : "";

    if (!question.trim()) {
      return Response.json(
        {
          error: language === "zh" ? "问题不能为空。" : "Question cannot be empty.",
        },
        { status: 400 }
      );
    }

    const reply = await createPortfolioChatReply({
      language,
      messages,
      pathname,
      question,
    });

    return Response.json(reply);
  } catch (error) {
    console.error("Portfolio chat route failed.", error);

    return Response.json(
      {
        error:
          "The portfolio chat service is temporarily unavailable.",
      },
      { status: 500 }
    );
  }
}
