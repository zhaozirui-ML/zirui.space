import { getPublicVisitorAnalyticsSummary } from "../../../../src/site/lib/visitor-analytics";

export const runtime = "nodejs";

export async function GET() {
  try {
    const summary = await getPublicVisitorAnalyticsSummary();

    return Response.json(summary);
  } catch (error) {
    console.error("Public visitor summary failed.", error);

    return Response.json(
      {
        enabled: false,
        totalUniqueVisitors: 0,
      },
      { status: 200 }
    );
  }
}
