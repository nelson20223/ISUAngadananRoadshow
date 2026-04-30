function SearchFilterSort({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minQuantity,
  setMinQuantity,
  sortBy,
  setSortBy,
  order,
  setOrder,
  setPage,
}) {
  const resetPage = () => {
    setPage(1);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="mb-3">Browse Products</h4>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Search Product</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Min Price</label>
            <input
              type="number"
              className="form-control"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                resetPage();
              }}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Max Price</label>
            <input
              type="number"
              className="form-control"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                resetPage();
              }}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Min Quantity</label>
            <input
              type="number"
              className="form-control"
              value={minQuantity}
              onChange={(e) => {
                setMinQuantity(e.target.value);
                resetPage();
              }}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                resetPage();
              }}
            >
              <option value="product_name">Name</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Order</label>
            <button
              className="btn btn-outline-dark w-100"
              type="button"
              onClick={() => {
                setOrder(order === "asc" ? "desc" : "asc");
                resetPage();
              }}
            >
              {order.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilterSort;