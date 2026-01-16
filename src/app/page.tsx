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
    <div style={{ padding: 20 }}>
      <h1>🛒 Mini E-Commerce Website</h1>

      <h2>Products</h2>
      {products.map((p) => (
        <div
          key={p._id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <h3>{p.name}</h3>
          <p>Price: Rs {p.price}</p>
          <p>{p.description}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}

      <hr />

      <h2>Cart ({cart.length})</h2>
      {cart.map((c, index) => (
        <p key={index}>
          {c.name} - Rs {c.price}
        </p>
      ))}
    </div>
  );
}
