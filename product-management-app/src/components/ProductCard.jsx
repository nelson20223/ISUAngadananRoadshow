function ProductCard({ product, onEdit, onDelete }) {
  const imageUrl = product.image
    ? `https://kwikweb.live/storage/${product.image}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={imageUrl}
          className="card-img-top product-image"
          alt={product.product_name}
        />

        <div className="card-body">
          <h5 className="card-title">{product.product_name}</h5>
          <p className="card-text mb-1">
            <strong>Price:</strong> ₱{product.price}
          </p>
          <p className="card-text">
            <strong>Quantity:</strong> {product.quantity}
          </p>

          <div className="d-flex gap-2">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;