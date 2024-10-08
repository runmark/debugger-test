export function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInStockOnlyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={onFilterTextChange}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={onInStockOnlyChange}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}
