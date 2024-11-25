import ToDo from "@/interface/ToDo";
import { verifyApiAuth } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { user, session } = await verifyApiAuth(req);
  if (!user || !session) {
    return new Response(null, {
      status: 401,
    });
  }

  const newTodo: ToDo = await req.json();

  await sql`INSERT INTO todos (todo,"userId") 
           VALUES(${newTodo.todo},${newTodo.userId})`;

  return NextResponse.json("");
}
