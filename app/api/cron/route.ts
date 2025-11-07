import { isAiCooked } from "@/src/lib/services/isaicooked";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron or has the secret query param
  const authHeader = request.headers.get("authorization");
  const url = new URL(request.url);
  const secretParam = url.searchParams.get("secret");

  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isAdmin = secretParam === process.env.ADMIN_SECRET;

  if (!isVercelCron && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await isAiCooked();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
