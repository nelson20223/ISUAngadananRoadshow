# ISUAngadananRoadshow
# ISUAngadananRoadshow

# ProductHub — ICT RoadShow 2026 Front-End Entry

A modern, single-file front-end application for the 16th ICT RoadShow Front-End Programming Competition (April 30, 2026).

## Setup Instructions

No build step required. This is a **single HTML file** using Vanilla JS.

### Option A — Open Directly
```
Double-click index.html  →  open in any modern browser
```

### Option B — Local Server (recommended to avoid CORS)
```bash

# then open http://localhost:5173/

# Node.js
npx serve .
```
## Features

### Product Browsing
| Feature | Details |
|---|---|
| Grid layout | Responsive card grid with product image, name, price, quantity |
| Real-time search | Debounced search by product name |
| Price filter | Min price / Max price range |
| Quantity filter | Minimum quantity threshold |
| Sorting | Sort by Name, Price, or Quantity |
| Order toggle | ASC / DESC toggle button |
| Pagination | Previous / Next with current page & total pages display |
| Loading state | Inline spinner while fetching |
| Error handling | User-friendly error message on API failure |

### Product Management (CRUD)
| Feature | Details |
|---|---|
| View all | Tabular list with image, name, price, quantity |
| Add product | Modal form with image upload (drag & drop supported) |
| Edit product | Pre-filled modal loaded from `GET /api/products/{id}` |
| Delete product | Confirmation dialog before deletion |
| Image preview | Live preview before saving |
| Form validation | Client-side required field validation |

---

## API Endpoints Used

Base URL: `https://kwikweb.live`

| Method | Endpoint | Usage |
|---|---|---|
| `GET` | `/api/products/display` | Browse with search, filter, sort, paginate |
| `GET` | `/api/products` | Management table listing |
| `POST` | `/api/products` | Create new product |
| `GET` | `/api/products/{id}` | Load product for editing |
| `POST` | `/api/products/{id}` (`_method=PUT`) | Update product (FormData compatible) |
| `DELETE` | `/api/products/{id}` | Delete product |

### Query Parameters for `/api/products/display`
| Param | Description |
|---|---|
| `search` | Search by product name |
| `min_price` | Minimum price filter |
| `max_price` | Maximum price filter |
| `min_quantity` | Minimum quantity filter |
| `sort_by` | `product_name`, `price`, or `quantity` |
| `sort_order` | `asc` or `desc` |
| `page` | Page number for pagination |

---

## Technology Stack

- **HTML5 / CSS3** — single self-contained file
- **Google Fonts** — Syne (display) + DM Sans (body)
- **Fetch API** — all API communication
- **FormData** — image uploads




## Key UI Features

- Dark editorial theme with amber accent system
- Responsive grid (mobile-first, works on 320px+)
- Sticky header with tab navigation
- Toast notification system (success / error)
- Global loading overlay + inline loaders
- Drag-and-drop image upload with live preview
- Smooth animations and micro-interactions
