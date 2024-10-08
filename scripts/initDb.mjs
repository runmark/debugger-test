import { open } from "sqlite";
import sqlite3 from "sqlite3";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: 1, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: 1, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: 0, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: 1, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: 0, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: 1, name: "Peas" },
];

async function initDb() {
  const db = await open({
    filename: "products.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        price TEXT NOT NULL,
        stocked BOOLEAN NOT NULL,
        name TEXT NOT NULL
      )
    `);

  const products = await db.all("SELECT * FROM products");
  if (products.length !== 0) {
    console.log("Database has been initialized");
    console.log("the data is: ", products);
    return;
  }

  const stmt = await db.prepare(
    "INSERT INTO products (category, price, stocked, name) VALUES (?, ?, ?, ?)"
  );

  for (const product of PRODUCTS) {
    await stmt.run(
      product.category,
      product.price,
      product.stocked,
      product.name
    );
  }
  await stmt.finalize();
  console.log("Database initalized successfully");

  await db.close();
}

initDb().catch((err) => {
  console.log("Failed to initialize database: ", err);
});
