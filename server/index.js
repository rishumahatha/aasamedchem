const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});
app.get("/test-db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});
app.post("/products", async (req, res) => {
  try {
    const {
      seller_id,
      name,
      base_unit,
      price_per_base_unit,
      stock,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO products 
      (seller_id, name, base_unit, price_per_base_unit, stock)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [seller_id, name, base_unit, price_per_base_unit, stock]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
});
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
});
app.delete("/products/:id", async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [id]
    );

    res.json({
      message: "Deleted",
    });

  } catch (error) {
    console.log(error);
  }
});
app.post("/orders", async (req, res) => {
  try {
    const {
      buyer_id,
      seller_id,
      product_id,
      ordered_quantity,
      ordered_unit,
      converted_quantity,
      total_price,
    } = req.body;

    // GET PRODUCT
    const productResult = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [product_id]
    );

    const product = productResult.rows[0];

    // CHECK STOCK
    if (converted_quantity > product.stock) {
      return res.status(400).json({
        message: "Insufficient Stock",
      });
    }

    // INSERT ORDER
    const result = await pool.query(
      `INSERT INTO orders
      (
        buyer_id,
        seller_id,
        product_id,
        ordered_quantity,
        ordered_unit,
        converted_quantity,
        total_price,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        buyer_id,
        seller_id,
        product_id,
        ordered_quantity,
        ordered_unit,
        converted_quantity,
        total_price,
        "Pending",
      ]
    );

    // UPDATE STOCK
    await pool.query(
      `UPDATE products
       SET stock = stock - $1
       WHERE id = $2`,
      [converted_quantity, product_id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.log(error);
  }
});
app.get("/orders", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});