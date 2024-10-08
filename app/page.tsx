import { FilterableProductTable } from "./filterable-product-table";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

// get data from api route handler or server action.
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

async function getProducts() {
  const db = await open({
    filename: "products.db",
    driver: sqlite3.Database,
  });

  const products = await db.all("SELECT * FROM products");
  await db.close();

  return products;
}

// 1. break the UI into a component hierarchy
` 
 FilterableProductTable
   1. SearchBar
   2. ProductTable
       a. ProductCategoryRow
       b. ProductRow
`;

// 2. build a static version
// take your data model as a prop

// 3. find the minimal but complete presentation of UI state
// 4. identify where the state should live
// 5. add inverse data flow

export default async function Home() {
  const products = await getProducts();
  return <FilterableProductTable products={products} />;
}
