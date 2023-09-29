import { NextResponse, NextRequest } from "next/server";
import  { connectToDatabase }    from "../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  let db = await connectToDatabase();
  const ytvideos = await db.db.collection("ytvideos").find().toArray();
  return NextResponse.json({playlistData:ytvideos});
}

export async function POST(request: Request) {
  let db = await connectToDatabase();
  const data = await request.json();
  const ytvideos = await db.db.collection("ytvideos").insertOne(data);
  return NextResponse.json( {message: 'Saved Successfully.'});
}

export async function DELETE(request: Request) {
  let db = await connectToDatabase();
  const { _id } = await request.json();
  let id = new ObjectId(_id); 
  const deletedItem = await db.db.collection("ytvideos").deleteMany({_id: id});
  return NextResponse.json( {message: 'Successfully Deleted'});
}