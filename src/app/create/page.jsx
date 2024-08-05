"use client";

import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import React, { useState } from "react";

function AddMenuPage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !image || !price) {
      alert("Please complete all inputs field.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, image, price }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to add new menu");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Add new menu</h3>
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
          onChange={(event) => setTitle(event.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Menu title"
        />
        <input
          type="text"
          onChange={(event) => setImage(event.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Image URL"
        />
        <textarea
          onChange={(event) => setPrice(event.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Enter the price"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddMenuPage;
