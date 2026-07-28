# Restaurant Ordering Frontend

A modern restaurant ordering web application built with **React** and **TypeScript**. Users can register, log in, browse available foods, place orders, and view their previous orders through a clean and responsive user interface.

## Features

- User authentication (Login / Sign Up)
- Cookie-based authentication
- Browse food categories and menu items
- View food details with images
- Place food orders
- View personal order history
- Responsive user interface
- Protected routes for authenticated users

## Tech Stack

| Layer | Technology |
|--------|------------|
| Framework | React 18 + TypeScript |
| UI Components | Material UI (MUI) |
| Routing | React Router DOM |
| HTTP Client | Axios |
| State Management | React Context API |
| Form Validation | React Hook Form |
| Notifications | React Toastify |
| Containerization | Docker, Nginx (Multi-stage Build) |
| Orchestration | Docker Compose |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
npm install
npm start
```

The application runs at:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
REACT_APP_API_URL=http://localhost:8080
```

---

## Docker

Build and run the application using Docker Compose.

```bash
docker compose up --build
```

The application will be served by **Nginx** on **port 3000**.

---


## Available Scripts

### `npm start`

Runs the application in development mode.

Open **http://localhost:3000** to view it in the browser.

---

### `npm run build`

Builds the application for production.

The optimized build is generated inside the **build** folder.

---

### `npm test`

Runs the test suite.

---

## Authentication

The application uses **HTTP-Only Cookies** for authentication.

After a successful login:

- The authentication cookie is automatically stored by the browser.
- Protected pages require authentication.
- Unauthorized users are redirected to the login page.

---

## Application Workflow

1. Users register or log in.
2. The frontend authenticates with the backend.
3. Available food categories and foods are displayed.
4. Users browse the menu.
5. Users place food orders.
6. Users can view their own order history.

---

## Backend

This frontend communicates with the Restaurant Ordering REST API developed using **ASP.NET Core** and **PostgreSQL**.
