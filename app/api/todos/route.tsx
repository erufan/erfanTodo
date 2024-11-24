import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") || "0");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const todos =
    await sql`SELECT * FROM todos ORDER BY id LIMIT ${pageSize} OFFSET ${skip}`;
  const totalCount = await sql`SELECT COUNT(*) FROM todos`;

  const result = {
    todos: todos.rows,
    total: +totalCount.rows[0].count,
    skip: skip,
    limit: pageSize,
  };

  const response = new NextResponse(JSON.stringify(result), {});

  return response;
}
