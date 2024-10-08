"use client";

import { useState } from "react";
import { SearchBar } from "./search-bar";
import { ProductTable } from "./product-table";

export type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

export function FilterableProductTable({ products }: { products: Product[] }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleInStockOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInStockOnly(e.target.checked);
  };

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockOnlyChange={handleInStockOnlyChange}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
}
