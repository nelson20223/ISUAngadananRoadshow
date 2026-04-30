import ProductCard from "./ProductCard";

function ProductList({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return (
      <div className="alert alert-info text-center">
        No products found.
      </div>
    );
  }

  return (
    <div className="row">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductList;