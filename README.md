# ISU Angadanan Roadshow — Product Management App

A React-based product management web application built with Vite, Bootstrap 5, and Axios. It connects to a live REST API to perform full CRUD operations on products, with support for search, filtering, sorting, and pagination.

---

## Features

- Browse products with image, name, price, and quantity
- Create, update, and delete products
- Search by product name
- Filter by price range and minimum quantity
- Sort by name, price, or quantity (ascending/descending)
- Paginated product listing
- Philippine Peso (₱) price formatting

---

## Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Framework  | React 19 + Vite 8        |
| Styling    | Bootstrap 5              |
| HTTP       | Axios                    |
| API        | `https://kwikweb.live/api/products` |

---

## Prerequisites

Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher (comes with Node.js)

To verify:
```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ISUAngadananRoadshow
```

### 2. Navigate to the app directory

```bash
cd product-management-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The app will be running at **http://localhost:5173** by default.

---

## Available Scripts

| Script            | Description                                    |
|-------------------|------------------------------------------------|
| `npm run dev`     | Start the Vite development server with hot reload |
| `npm run build`   | Build the app for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally           |

---

## Project Structure

```
product-management-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── productApi.js       # Axios API calls (GET, POST, PUT, DELETE)
│   ├── assets/
│   │   └── hero.png
│   ├── components/
│   │   ├── Pagination.jsx      # Pagination controls
│   │   ├── ProductCard.jsx     # Individual product card
│   │   ├── ProductForm.jsx     # Add/edit product form
│   │   ├── ProductList.jsx     # Product grid layout
│   │   └── SearchFilterSort.jsx # Search, filter, and sort controls
│   ├── pages/
│   │   └── ProductPage.jsx     # Main page with all state and logic
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # React entry point
│   ├── main.css                # Base styles
│   └── style.css               # Custom styles
├── index.html
├── package.json
└── package-lock.json
```

---

## API Reference

All requests go to `https://kwikweb.live/api/products`.

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | `/api/products`        | List products (supports query params) |
| POST   | `/api/products`        | Create a new product |
| POST   | `/api/products/{id}`   | Update a product (`_method=PUT` in body) |
| DELETE | `/api/products/{id}`   | Delete a product     |

Supported query parameters for GET:

| Parameter      | Description                         |
|----------------|-------------------------------------|
| `search`       | Filter by product name              |
| `min_price`    | Minimum price filter                |
| `max_price`    | Maximum price filter                |
| `min_quantity` | Minimum quantity filter             |
| `sort_by`      | Sort field: `name`, `price`, `quantity` |
| `sort_order`   | `asc` or `desc`                     |
| `page`         | Page number for pagination          |

---

## Production Build

To build for production:

```bash
npm run build
```

Output files will be in the `dist/` folder. You can then deploy those files to any static hosting service (e.g., Netlify, Vercel, GitHub Pages, or a web server).

To preview the build locally before deploying:

```bash
npm run preview
```

---

## Notes

- Product images are served from `https://kwikweb.live/storage/`. If an image URL already starts with `http`, it is used as-is.
- Prices are formatted in Philippine Peso (₱) using the `en-PH` locale.
- The `node_modules/` folder is excluded from version control — always run `npm install` after cloning.
