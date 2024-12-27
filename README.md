# CanalGraph

CanalGraph is a simple web app for managing and visualizing canal data. It lets users log in with a basic authentication system (powered by Laravel Breeze), it provide CRUD opperations for canals, and view a graph showing the percentage of clients for each canal. The app is built using Docker environment (Laravel Sail).

## Technologies Used

### Backend

- **[Laravel](https://laravel.com/)** : A PHP framework for backend development.
- **Inertia.js** : Bridges server-side and client-side rendering.
- **MySQL** : Database for storing canal data.

### Frontend

- **[React](https://reactjs.org/)** : A JavaScript library for building user interfaces.
- **[shadcn/ui](https://shadcn.dev/)** : UI components for React.
- **Tailwind CSS** : Utility-first CSS framework for styling.
- **Phosphor Icons** : Icon library for visual elements.
- **Recharts** : Library for creating dynamic graphs.

### Testing

- **Jest** : JavaScript testing framework for frontend components.
- **Pest** : Used for backend testing in Laravel.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

1. Install [Docker](https://www.docker.com/).
2. Install [Node.js](https://nodejs.org/) (v18 or higher).
3. Install [Composer](https://getcomposer.org/).

---

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Zdezorientowany/canals-graph.git .
cd canals-graph
```

#### 2. Configure Environment

Copy the `.env.example` file and update it with your local environment variables:

```bash
cp .env.example .env
```

#### 3. Install Dependencies

- Backend:
  ```bash
  composer install
  ```
- Frontend:
  ```bash
  npm install
  ```

#### 4. Set Up Database

Start the Docker containers using Laravel Sail:

```bash
./vendor/bin/sail up -d
```

### 5. Run migrations and seed the database (create database if necessary):

```bash
./vendor/bin/sail artisan migrate:fresh --seed
```
#### 6. Generate application key
Run the following command to generate the application key:

```
./vendor/bin/sail artisan key:generate
```

#### 7. Build Frontend Assets

```bash
npm run dev
```

#### 8. Start the Application

The application should now be running at:

```
http://localhost
```
Now login via seeded user ("asd@asd.asd" with password "asd") or register

---

## Testing

#### Backend Tests

Run Pest tests for the backend:

```bash
./vendor/bin/sail test
```

#### Frontend Tests

Run Jest tests for the frontend:

```bash
npm test
```
