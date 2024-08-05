import { NextResponse } from "next/server";

import { connectMongoDB } from "../../../../lib/mongodb";
import Menu from "../../../../models/Menu";

export async function POST(req) {
  const { title, image, price } = await req.json();
  console.log(title, image, price);
  await connectMongoDB();
  await Menu.create({ title, image, price });

  return NextResponse.json({ message: "Menu created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const menus = await Menu.find({});

  return NextResponse.json({ menus });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Menu.findByIdAndDelete(id);

  return NextResponse.json({ message: "Menu deleted" }, { status: 200 });
}
