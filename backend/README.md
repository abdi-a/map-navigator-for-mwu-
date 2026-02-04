# MWU Smart Campus Navigator - Backend

## Setup Instructions

1.  **Prerequisites**: PHP 8.1+, Composer, MySQL.
2.  **Install Dependencies**:
    ```bash
    composer install
    ```
3.  **Environment**:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
4.  **Database**:
    - Create a database named `mwu_campus` in MySQL (phpMyAdmin/HeidiSQL).
    - Update `.env` with DB credentials.
5.  **Migrations & Seeding**:
    ```bash
    php artisan migrate --seed
    ```
6.  **Serve**:
    ```bash
    php artisan serve
    ```
    API will be available at `http://localhost:8000/api`.

## OSRM Setup
This project uses OSRM for routing. You can use the public demo server for development:
`OSRM_BASE_URL=http://router.project-osrm.org`
*Note: Public OSRM API has usage limits. For production, host your own OSRM instance.*
