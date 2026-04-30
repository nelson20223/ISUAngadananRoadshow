import { useEffect, useState } from "react";
import {
  displayProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

function ProductPage() {
  const [activeTab, setActiveTab] = useState("browse");
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minQuantity, setMinQuantity] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const imageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith("http")) return image;
    return `https://kwikweb.live/storage/${image}`;
  };

  const formatPrice = (value) => {
    return "₱" + Number(value || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await displayProducts({
        search,
        min_price: minPrice,
        max_price: maxPrice,
        min_quantity: minQuantity,
        sort_by: sortBy,
        sort_order: order,
        order,
        page,
      });

      const data = response.data;
      const productList = Array.isArray(data) ? data : data.data || data.products || [];

      setProducts(productList);
      setTotalPages(data.last_page || data.total_pages || 1);
      setTotalProducts(data.total || productList.length);
    } catch (err) {
      setError("Failed to fetch products. Please check the API connection.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, minPrice, maxPrice, minQuantity, sortBy, order, page]);

  const resetForm = () => {
    setProductName("");
    setQuantity("");
    setPrice("");
    setImage(null);
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductName(product.product_name || "");
    setQuantity(product.quantity || "");
    setPrice(product.price || "");
    setImage(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("quantity", quantity);
    formData.append("price", price);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      setError("");

      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }

      closeModal();
      fetchProducts();
      setActiveTab("manage");
    } catch (err) {
      setError("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    const confirmDelete = confirm(`Delete "${product.product_name}"? This cannot be undone.`);

    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteProduct(product.id);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="logo">
          Product<span>Hub</span>
        </div>

        <nav className="nav-tabs-custom">
          <button
            className={`tab-btn ${activeTab === "browse" ? "active" : ""}`}
            onClick={() => setActiveTab("browse")}
          >
            Browse Products
          </button>

          <button
            className={`tab-btn ${activeTab === "manage" ? "active" : ""}`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Products
          </button>
        </nav>
      </header>

      <main className="app-main">
        {error && <div className="alert-dark-custom">{error}</div>}

        {activeTab === "browse" && (
          <>
            <div className="page-header">
              <div className="page-title">
                Products
                <small>{loading ? "Loading…" : `${totalProducts} products`}</small>
              </div>
            </div>

            <div className="controls-bar">
              <div className="controls-left">
                <div className="search-wrap">
                  <input
                    className="input-dark"
                    type="text"
                    placeholder="Search products…"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>

                <div className="filter-group">
                  <label>Price</label>
                  <input
                    className="input-dark filter-input"
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPage(1);
                    }}
                  />
                  <span style={{ color: "var(--muted)" }}>—</span>
                  <input
                    className="input-dark filter-input"
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>

                <div className="filter-group">
                  <label>Min Qty</label>
                  <input
                    className="input-dark filter-input"
                    type="number"
                    placeholder="0"
                    value={minQuantity}
                    onChange={(e) => {
                      setMinQuantity(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="controls-right">
                <select
                  className="select-dark sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Sort by…</option>
                  <option value="product_name">Name</option>
                  <option value="price">Price</option>
                  <option value="quantity">Quantity</option>
                </select>

                <button
                  className="order-btn"
                  onClick={() => {
                    setOrder(order === "asc" ? "desc" : "asc");
                    setPage(1);
                  }}
                  title="Toggle order"
                >
                  {order === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>

            {loading ? (
              <div className="loader">
                <div className="spinner-custom"></div>
                Loading products…
              </div>
            ) : products.length === 0 ? (
              <div className="state-box">
                <h3>📦 No products found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product) => {
                  const src = imageUrl(product.image);

                  return (
                    <div className="product-card" key={product.id}>
                      {src ? (
                        <img
                          className="card-image"
                          src={src}
                          alt={product.product_name}
                        />
                      ) : (
                        <div className="card-image-placeholder">📦</div>
                      )}

                      <div className="product-card-body">
                        <div className="card-name">{product.product_name}</div>

                        <div className="card-meta">
                          <span className="badge-custom badge-price">
                            {formatPrice(product.price)}
                          </span>

                          <span className="badge-custom badge-qty">
                            Qty: {product.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pagination-custom">
              <button
                className="btn-custom btn-ghost"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              <span style={{ color: "var(--muted)" }}>
                Page <strong style={{ color: "var(--text)" }}>{page}</strong> of{" "}
                <strong style={{ color: "var(--text)" }}>{totalPages}</strong>
              </span>

              <button
                className="btn-custom btn-ghost"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}

        {activeTab === "manage" && (
          <>
            <div className="page-header">
              <div className="page-title">
                Product Management
                <small>Create, edit, and delete products</small>
              </div>

              <button className="btn-custom btn-primary-custom" onClick={openAddModal}>
                + Add Product
              </button>
            </div>

            {loading ? (
              <div className="loader">
                <div className="spinner-custom"></div>
                Loading products…
              </div>
            ) : products.length === 0 ? (
              <div className="state-box">
                <h3>📦 No products yet</h3>
                <p>Click Add Product to get started.</p>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="table-dark-custom">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => {
                      const src = imageUrl(product.image);

                      return (
                        <tr key={product.id}>
                          <td>
                            {src ? (
                              <img className="td-img" src={src} alt={product.product_name} />
                            ) : (
                              <div className="td-img d-flex align-items-center justify-content-center">
                                📦
                              </div>
                            )}
                          </td>

                          <td>{product.product_name}</td>

                          <td>
                            <span className="badge-custom badge-price">
                              {formatPrice(product.price)}
                            </span>
                          </td>

                          <td>
                            <span className="badge-custom badge-qty">
                              {product.quantity}
                            </span>
                          </td>

                          <td>
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                className="btn-custom btn-ghost"
                                onClick={() => openEditModal(product)}
                              >
                                ✏️ Edit
                              </button>

                              <button
                                className="btn-custom btn-danger-custom"
                                onClick={() => handleDelete(product)}
                              >
                                🗑 Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>

      {showModal && (
        <div className="modal-backdrop-custom">
          <div className="modal-card">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="modal-title-custom">
                {editingProduct ? "Edit Product" : "Add Product"}
              </div>

              <button className="btn-custom btn-ghost" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label-custom">Product Name *</label>
                <input
                  className="input-dark"
                  type="text"
                  placeholder="e.g. Wireless Headphones"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label-custom">Price (₱) *</label>
                  <input
                    className="input-dark"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label-custom">Quantity *</label>
                  <input
                    className="input-dark"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label-custom">Product Image</label>

                <div className="upload-area">
                  <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>📷</div>
                  <input
                    className="input-dark"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <small>
                    {image ? image.name : "Choose PNG, JPG, or GIF image"}
                  </small>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn-custom btn-ghost" onClick={closeModal}>
                  Cancel
                </button>

                <button type="submit" className="btn-custom btn-primary-custom">
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPage;