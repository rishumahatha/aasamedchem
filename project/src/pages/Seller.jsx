import { useState } from "react";

function Seller() {
  const [formData, setFormData] = useState({
    name: "",
    base_unit: "",
    price_per_base_unit: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async () => {
    await fetch("https://aasamedchem.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seller_id: 1,
        ...formData,
      }),
    });

    alert("Product Added");
  };

  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        Seller Panel
      </h1>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        className="border p-2"
      />

      <select
        name="base_unit"
        onChange={handleChange}
        className="border p-2"
      >
        <option>Select Unit</option>
        <option value="g">Gram</option>
        <option value="kg">Kilogram</option>
        <option value="mL">Milliliter</option>
        <option value="L">Liter</option>
      </select>

      <input
        type="number"
        name="price_per_base_unit"
        placeholder="Price"
        onChange={handleChange}
        className="border p-2"
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        onChange={handleChange}
        className="border p-2"
      />

      <button
        onClick={addProduct}
        className="bg-black text-white p-2"
      >
        Add Product
      </button>
    </div>
  );
}

export default Seller;
