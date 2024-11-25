import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  const todo = await sql`SELECT * FROM todos WHERE id=${id}`;

  if (todo.rowCount === 0) return NextResponse.json({}, { status: 404 });

  return NextResponse.json(todo.rows[0]);
}
