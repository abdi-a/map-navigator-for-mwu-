# MWU Smart Campus Navigator - Frontend

## Setup

1.  **Install Node.js** (v18+).
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Environment**:
    - Rename `.env.example` to `.env.local` (optional, defaults to localhost:8000).
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## Features
- **Campus Lock**: Map restricted to MWU bounds.
- **Smart Filters**: Filter by Category.
- **Navigation**: Blue line route from user location to building.
- **Visuals**: Building images and details.

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Leaflet (React-Leaflet)
- Axios
