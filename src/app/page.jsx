"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import DeleteButton from "./components/DeleteButton";

export default function Home() {
  const [menuData, setMenuData] = useState([]);
  console.log(menuData);

  const getMenus = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/menus", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch menu data");
      }

      const data = await res.json();
      setMenuData(data.menus);
    } catch (error) {
      console.log("Error loading menus: ", error);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <main className="container mx-auto mt-5">
      <h1>Next.js CRUD + MongoDB</h1>
      <hr className="my-3" />
      <button className="bg-green-500 p-3 text-white rounded">
        <Link href="/create">Add new menu</Link>
      </button>
      <div className="grid grid-cols-4 mt-3 gap-5">
        {menuData && menuData.length > 0 ? (
          menuData.map((val) => (
            <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
              <h4 className="text-2xl">{val.title}</h4>
              <Image
                className="my-3 rounded-md"
                src={val.image}
                width={300}
                height={0}
                alt={val.title}
              />
              <p>{val.price}</p>
              <div className="mt-5">
                <Link
                  href={`/edit/${val._id}`}
                  className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2"
                >
                  Edit
                </Link>
                <DeleteButton id={val._id} />
              </div>
            </div>
          ))
        ) : (
          <p className="bg-gray-300 p-3 mt-3">You do not have any menu yet.</p>
        )}
      </div>
    </main>
  );
}
