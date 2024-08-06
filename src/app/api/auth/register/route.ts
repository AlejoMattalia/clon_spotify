import { NextResponse } from "next/server";

export async function POST(request: Request) { 

    const data = await new Response(request.body).json();

    console.log(data);
    return NextResponse.json("ok");
}