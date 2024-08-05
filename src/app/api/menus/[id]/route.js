import { NextResponse } from "next/server";

import { connectMongoDB } from "../../../../lib/mongodb";
import Menu from "../../../../models/Menu";

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const menu = await Menu.findOne({ _id: id });

  return NextResponse.json({ menu }, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newImage: image,
    newPrice: price,
  } = await req.json();
  await connectMongoDB();
  await Menu.findByIdAndUpdate(id, { title, image, price });

  return NextResponse.json({ message: "Menu updated" }, { status: 200 });
}
