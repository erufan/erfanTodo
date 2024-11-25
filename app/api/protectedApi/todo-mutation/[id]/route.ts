import ToDo from "@/interface/ToDo";
import { verifyApiAuth } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  const { user, session } = await verifyApiAuth(req);
  if (!user || !session) {
    return new Response(null, {
      status: 401,
    });
  }

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
  const { user, session } = await verifyApiAuth(req);
  if (!user || !session) {
    return new Response(null, {
      status: 401,
    });
  }

  const todo = await sql`DELETE FROM todos WHERE id=${id}`;

  if (todo.rowCount === 0) return NextResponse.json({}, { status: 404 });

  return NextResponse.json("");
}
