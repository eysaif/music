import { NextResponse, NextRequest } from "next/server";
import  { connectToDatabase }    from "../lib/mongodb";

export async function GET() {
  let db = await connectToDatabase();
  const ytvideos = await db.db.collection("ytvideos").find().toArray();
  return NextResponse.json( {message: ytvideos});
}

export async function POST(request: Request) {
  let db = await connectToDatabase();
  const data = await request.json();
  const ytvideos = await db.db.collection("ytvideos").insertOne(data);
  return NextResponse.json( {message: 'Saved Successfully.'});
}
