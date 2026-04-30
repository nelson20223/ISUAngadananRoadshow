function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="d-flex justify-content-center align-items-center gap-3 my-4">
      <button
        className="btn btn-outline-primary"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        className="btn btn-outline-primary"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;