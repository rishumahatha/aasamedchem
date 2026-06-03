import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Buyer() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://aasamedchem.onrender.com/products");

    const data = await response.json();

    setProducts(data);
  };

  const calculatePrice = (product) => {
    const qty = parseFloat(quantity);
    if (!qty || isNaN(qty)) return "0.00";

    let convertedQty = qty;

    if (unit === "kg") convertedQty = qty * 1000;
    if (unit === "L") convertedQty = qty * 1000;

    return (convertedQty * product.price_per_base_unit).toFixed(2);
  };
  const placeOrder = async (product) => {
    const qty = parseFloat(quantity);
    if (!qty || isNaN(qty) || !unit) {
      alert("Please enter a valid quantity and select a unit.");
      return;
    }

    let convertedQty = qty;
    if (unit === "kg") convertedQty = qty * 1000;
    if (unit === "L") convertedQty = qty * 1000;

    const total = convertedQty * product.price_per_base_unit;

    try {
      const res = await fetch("https://aasamedchem.onrender.com/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer_id: 1,
          seller_id: product.seller_id,
          product_id: product.id,
          ordered_quantity: qty,
          ordered_unit: unit,
          converted_quantity: convertedQty,
          total_price: total,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");
      alert("Order Placed");
    } catch (err) {
      console.error(err);
      alert("Could not place order. Try again.");
    }
  };
  return (
    <div className="p-10">

      <Link to="/">
        <button className="bg-black text-white px-4 py-2 mb-6 rounded">
          Back To Home
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Buyer Panel</h1>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{product.name}</h2>

            <p>Price: ₹{product.price_per_base_unit}</p>

            <p>Base Unit: {product.base_unit}</p>

            <input
              type="number"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 mt-2 w-full"
            />

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border p-2 mt-2 w-full"
            >
              <option value="">Select Unit</option>
              <option value="g">Gram</option>
              <option value="kg">Kilogram</option>
              <option value="mL">Milliliter</option>
              <option value="L">Liter</option>
            </select>

            <p className="mt-3 font-bold">Total: ₹{calculatePrice(product)}</p>
            <button
              onClick={() => placeOrder(product)}
              className="bg-black text-white px-4 py-2 mt-3"
            >
              Place Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buyer;
