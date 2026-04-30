import { useEffect, useState } from "react";

function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.product_name || "");
      setQuantity(editingProduct.quantity || "");
      setPrice(editingProduct.price || "");
      setImage(null);
    } else {
      setProductName("");
      setQuantity("");
      setPrice("");
      setImage(null);
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("quantity", quantity);
    formData.append("price", price);

    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);

    if (!editingProduct) {
      setProductName("");
      setQuantity("");
      setPrice("");
      setImage(null);
      e.target.reset();
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-3">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-primary" type="submit">
              {editingProduct ? "Update Product" : "Add Product"}
            </button>

            {editingProduct && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;