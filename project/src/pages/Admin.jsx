import { useEffect, useState } from "react";

function Admin() {

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  // FETCH ORDERS
  const fetchOrders = async () => {
    const response = await fetch(
      "https://aasamedchem.onrender.com/orders"
    );

    const data = await response.json();

    setOrders(data);
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const response = await fetch(
      "https://aasamedchem.onrender.com/products"
    );

    const data = await response.json();

    setProducts(data);
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await fetch(
      `https://aasamedchem.onrender.com/products/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchProducts();
  };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Panel
      </h1>

      {/* PRODUCTS */}

      <h2 className="text-2xl font-bold mb-4">
        Products
      </h2>

      <div className="grid gap-4 mb-10">

        {products.map((product) => (

          <div
            key={product.id}
            className="border p-4 rounded"
          >

            <p>
              Product:
              {product.name}
            </p>

            <p>
              Stock:
              {product.stock}
            </p>

            <p>
              Unit:
              {product.base_unit}
            </p>

            <p>
              Price:
              ₹{product.price_per_base_unit}
            </p>

            <button
              onClick={() =>
                deleteProduct(product.id)
              }
              className="bg-red-500 text-white px-4 py-2 mt-3"
            >
              Delete Product
            </button>

          </div>
        ))}
      </div>

      {/* ORDERS */}

      <h2 className="text-2xl font-bold mb-4">
        Orders
      </h2>

      <div className="grid gap-4">

        {orders.map((order) => (

          <div
            key={order.id}
            className="border p-4 rounded"
          >

            <p>
              Product ID:
              {order.product_id}
            </p>

            <p>
              Ordered Quantity:
              {order.ordered_quantity}
              {order.ordered_unit}
            </p>

            <p>
              Converted Quantity:
              {order.converted_quantity}
            </p>

            <p>
              Total Price:
              ₹{order.total_price}
            </p>

            <p>
              Status:
              {order.status}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;