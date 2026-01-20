"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

interface CartItem extends Product {
  qty: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = async (product: Product) => {
    const existing = cart.find((c) => c._id === product._id);

    if (existing) {
      setCart(
        cart.map((c) =>
          c._id === product._id
            ? { ...c, qty: c.qty + 1 }
            : c
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    setMessage("Item added to cart ✅");
    setTimeout(() => setMessage(""), 1500);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((c) => c._id !== id));
  };

  const changeQty = (id: string, delta: number) => {
    setCart(
      cart.map((c) =>
        c._id === id
          ? { ...c, qty: Math.max(1, c.qty + delta) }
          : c
      )
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Mini E-Commerce</h1>
        <p>this is my E-Comerence website</p>

        <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
          Cart: {cart.reduce((a, c) => a + c.qty, 0)}
        </span>
      </nav>

      <div className="p-6">
        {/* 🔹 Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full mb-6 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🔹 Feedback */}
        {message && (
          <div className="mb-4 text-green-600 font-medium">
            {message}
          </div>
        )}

        {/* 🔹 Products */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
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
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Cart Summary</h2>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500">
              Your cart is empty 🛒
            </p>
          ) : (
            <>
              {cart.map((c) => (
                <div
                  key={c._id}
                  className="flex justify-between items-center border-b py-3"
                >
                  <span>
                    {c.name} — Rs {c.price}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => changeQty(c._id, -1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{c.qty}</span>
                    <button
                      onClick={() => changeQty(c._id, 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(c._id)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-4 text-right font-bold text-lg">
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
