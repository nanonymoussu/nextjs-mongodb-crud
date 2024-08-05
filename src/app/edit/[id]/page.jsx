"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";

function EditMenuPage({ params }) {
  const { id } = params;
  console.log(id);

  const [menuData, setMenuData] = useState("");

  // New menu data
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const router = useRouter();

  const getPostById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/menus/${id}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch menu data");
      }

      const data = await res.json();
      console.log("Edit menu: ", data);
      setMenuData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostById(id);
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/menus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newImage, newPrice }),
      });

      if (!res.ok) {
        throw new Error("Failed to update menu");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Edit Menu</h3>
      <hr className="my-3" />
      <Link
        href="/"
        className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
      >
        Go Back
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setNewTitle(event.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={menuData?.menu?.title}
        />
        <input
          type="text"
          onChange={(event) => setNewImage(event.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={menuData?.menu?.image}
        />
        <textarea
          onChange={(event) => setNewPrice(event.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={menuData?.menu?.price}
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditMenuPage;
