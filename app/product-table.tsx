import { ReactNode } from "react";
import { type Product } from "./filterable-product-table";

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }: { product: Product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// 一切皆 value：将 component 看作 value，UI 也是 value
// 此种方式的好处是，code、UI component 可以统一处理
// 此种方式的原理是，UI 是可以用 code 表示的
export function ProductTable({
  products,
  filterText,
  inStockOnly,
}: {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}) {
  // const categories = products.reduce(
  //   (acc: { [key: string]: Product[] }, product: Product) => {
  //     const { category } = product;

  //     if (!acc[category]) {
  //       acc[category] = [];
  //     }

  //     acc[category].push(product);

  //     return acc;
  //   },
  //   {}
  // );

  // const rows: ReactNode[] = [];

  // Object.entries(categories).map((category) => {
  //   const categoryName = category[0];
  //   const productsInCategory = category[1];
  //   return (
  //     <>
  //       <tr>
  //         <th colSpan={2}>{categoryName}</th>
  //       </tr>
  //       {productsInCategory.map((product) => (
  //         <tr key={product.name}>
  //           <td>{product.name}</td>
  //           <td>{product.price}</td>
  //         </tr>
  //       ))}
  //     </>
  //   );
  // });

  const rows: ReactNode[] = [];
  let lastCategory: string = "";

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1)
      return;

    if (inStockOnly && !product.stocked) return;

    if (lastCategory !== product.category) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
