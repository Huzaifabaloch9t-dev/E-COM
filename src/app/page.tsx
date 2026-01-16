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

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">Mini E-Commerce</h1>
        <span className="font-medium">
          Cart: {cart.length} items
        </span>
      </nav>

      <div className="p-6">
        {/* 🔹 Products */}
        <h2 className="text-2xl font-bold mb-6">Products</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-600 mt-1">
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

        {/* 🔹 Cart Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">
            Cart Summary
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">
              Your cart is empty 🛒
            </p>
          ) : (
            <>
              {cart.map((c, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>
                    {c.name} — Rs {c.price}
                  </span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="mt-4 text-right font-bold">
                Total: Rs {total}
              </div>

              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
