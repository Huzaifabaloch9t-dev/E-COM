"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = async (product: Product) => {
    await axios.post("http://localhost:5000/api/cart", product);
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🛒 Mini E-Commerce Website
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow-md p-5"
          >
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-gray-600 mt-2">
              Rs {p.price}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {p.description}
            </p>

            <button
              onClick={() => addToCart(p)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl shadow-md p-5">
        <h2 className="text-2xl font-bold mb-4">
          Cart ({cart.length})
        </h2>

        {cart.length === 0 && (
          <p className="text-gray-500">Cart is empty</p>
        )}

        {cart.map((c, index) => (
          <p key={index} className="text-gray-700">
            {c.name} — Rs {c.price}
          </p>
        ))}
      </div>
    </div>
  );
}
