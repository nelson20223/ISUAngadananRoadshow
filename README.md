# ISU Angadanan Roadshow — Product Management App

A React + Vite single-page application for managing products. Built with a dark UI theme and connected to a REST API backend.

---

## Features

- **Browse Products** — View all products in a responsive card grid with product images, prices, and quantities.
- **Search** — Filter products by name in real time.
- **Filter** — Narrow results by price range (min/max) and minimum quantity.
- **Sort** — Sort by product name, price, or quantity in ascending or descending order.
- **Pagination** — Navigate through multiple pages of results.
- **Add Product** — Create a new product with name, price, quantity, and an optional image upload.
- **Edit Product** — Update an existing product's details and image.
- **Delete Product** — Remove a product with a confirmation prompt.

---

## Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| UI Library | React 19                      |
| Build Tool | Vite 8                        |
| Styling    | Bootstrap 5 + custom CSS      |
| HTTP       | Axios                         |
| Backend    | REST API at `kwikweb.live`    |

---

## Project Structure

```
ISUAngadananRoadshow/
└── product-management-app/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── api/
    │   │   └── productApi.js       # Axios API calls (CRUD)
    │   ├── assets/
    │   ├── components/
    │   │   ├── Pagination.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── ProductForm.jsx
    │   │   ├── ProductList.jsx
    │   │   └── SearchFilterSort.jsx
    │   ├── pages/
    │   │   └── ProductPage.jsx     # Main page with Browse & Manage tabs
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── main.css
    │   └── style.css
    ├── index.html
    └── package.json
```

---

## API Endpoints

Base URL: `https://kwikweb.live/api/products`

| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | `/api/products`       | List products      |
| POST   | `/api/products`       | Create product     |
| POST   | `/api/products/{id}`  | Update product (`_method=PUT`) |
| DELETE | `/api/products/{id}`  | Delete product     |

Query parameters supported on `GET`:  
`search`, `min_price`, `max_price`, `min_quantity`, `sort_by`, `sort_order`, `page`

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd ISUAngadananRoadshow/product-management-app

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## Usage

The app has two tabs:

**Browse Products** — Read-only view of all products. Use the search bar, price/quantity filters, and sort controls to find what you need. Navigate pages with the Prev/Next buttons.

**Manage Products** — Full CRUD view. Click **+ Add Product** to open the form modal. Use the **Edit** and **Delete** buttons on each row to modify or remove products.
