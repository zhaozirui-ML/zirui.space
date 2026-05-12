import { createHash } from "node:crypto";
import { headers } from "next/headers";

import { registerVisitor } from "../../../../src/site/lib/visitor-analytics";

export const runtime = "nodejs";

function hashUserAgent(userAgent) {
  if (typeof userAgent !== "string" || userAgent.trim().length === 0) {
    return null;
  }

  return createHash("sha256")
    .update(userAgent.trim())
    .digest("hex")
    .slice(0, 16);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const visitorId = typeof body?.visitorId === "string" ? body.visitorId : "";
    const pathname = typeof body?.pathname === "string" ? body.pathname : "/";
    const referrer = typeof body?.referrer === "string" ? body.referrer : "";
    const requestHeaders = await headers();
    const userAgent = requestHeaders.get("user-agent");
    const userAgentHash = hashUserAgent(userAgent);

    if (visitorId.trim().length === 0) {
      return Response.json(
        {
          error: "visitorId is required.",
        },
        { status: 400 }
      );
    }

    const result = await registerVisitor({
      pathname,
      referrer,
      userAgentHash,
      visitorId,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Visitor analytics registration failed.", error);

    return Response.json(
      {
        error: "Visitor analytics is temporarily unavailable.",
      },
      { status: 500 }
    );
  }
}
