import ToDo from "@/interface/ToDo";
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

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  const modifiedTodo: ToDo = await req.json();

  const todo = await sql`UPDATE todos SET 
              todo=${modifiedTodo.todo},completed=${modifiedTodo.completed} 
              WHERE id=${id}`;

  if (todo.rowCount === 0) return NextResponse.json({}, { status: 404 });

  return NextResponse.json("");
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  const todo = await sql`DELETE FROM todos WHERE id=${id}`;

  if (todo.rowCount === 0) return NextResponse.json({}, { status: 404 });

  return NextResponse.json("");
}
