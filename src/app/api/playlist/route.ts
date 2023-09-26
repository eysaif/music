import { NextResponse } from "next/server";

export  function GET() {

  const playlist = [
    { key: 1, value: "General" },
    { key: 2, value: "Favorite" },
    { key: 3, value: "Custom" },
  ];
  return NextResponse.json(playlist);
}