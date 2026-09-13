# Online BookStore

Online BookStore is a full-stack web application for discovering books, managing a shopping cart, and placing orders. It combines a React frontend with a Spring Boot REST API and a MySQL database.

## Features

### Customer experience

- Browse books loaded from the backend API.
- View book covers, titles, authors, and prices.
- Add books to a cart, change quantities, and remove items.
- Keep cart contents in browser local storage between page visits.
- Register and log in as a customer.
- Place an order from the cart and see success or error messages.
- Navigate between home, catalogue, cart, login, and registration pages.
- Use the responsive layout on desktop and mobile screens.

### Backend capabilities

- REST endpoints for authentication, books, and orders.
- Spring Data JPA repositories for users, books, orders, and order items.
- MySQL persistence for customer and order data.
- Hibernate schema update support through `spring.jpa.hibernate.ddl-auto=update`.
- Cross-origin configuration for local React development.

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React 18, React Router, Axios, Bootstrap 5 |
| Backend | Java 17+, Spring Boot, Spring Web, Spring Data JPA |
| Database | MySQL 8 or compatible version |
| Build tools | npm and Maven Wrapper |

## Requirements

- Java Development Kit (JDK) 17 or newer
- Node.js and npm
- MySQL Server 8 or newer
- Git (optional, for cloning the repository)

Check the installed tools with:

```bash
java -version
node --version
npm --version
```

## Project Structure

```text
online-bookstore/
├── backend/                 Spring Boot API and database layer
│   ├── src/main/java/       Controllers, models, repositories, and config
│   └── src/main/resources/  Backend configuration
├── frontend/                React single-page application
│   ├── public/
│   └── src/                  Components and route pages
└── README.md
```

## Database Setup

1. Start MySQL Server.
2. Create the application database:

```sql
CREATE DATABASE bookstore_db;
```

3. Open `backend/src/main/resources/application.properties`.
4. Set the MySQL username and password for your machine:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bookstore_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}
```

Before starting the backend, set `DB_PASSWORD` in your terminal. PowerShell example:

```powershell
$env:DB_PASSWORD = "your_mysql_password"
```

You can also set `DB_USERNAME` if your MySQL user is not `root`.

The application creates or updates its tables when the backend starts. Add book records to the `books` table before opening Catalogue if the database is empty.

## How to Run

Open terminals from the `online-bookstore` directory.

### Start the backend

On Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

On macOS or Linux:

```bash
cd backend
./mvnw spring-boot:run
```

The API runs at `http://localhost:8080`.

### Install and start the frontend

```bash
cd frontend
npm install
npm start
```

The React app opens at `http://localhost:3000`.

### Use the application

1. Open the home page.
2. Register a customer account.
3. Log in with the new account.
4. Open Catalogue and add books to the cart.
5. Adjust quantities or remove items in Cart.
6. Select Place Order to save the order to MySQL.

## API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Log in a user |
| `GET` | `/api/books` | Fetch catalogue books |
| `POST` | `/api/orders` | Create an order |

## Screenshots

Add project screenshots in the empty spaces below.

### Home page

<img width="1894" height="855" alt="image" src="https://github.com/user-attachments/assets/bfd0ee09-03b3-4537-abe6-69a85768dca7" />


<br><br><br><br><br>

### Catalogue

<img width="1900" height="858" alt="image" src="https://github.com/user-attachments/assets/37a19719-86a0-40be-8b0b-3cd98189f2e5" />


<br><br><br><br><br>

### Cart

<img width="1896" height="837" alt="image" src="https://github.com/user-attachments/assets/ed197868-9e02-45ec-a825-35b5b2dfbf8d" />


<br><br><br><br><br>


## Troubleshooting

- If the backend cannot connect to MySQL, check that MySQL is running and the credentials are correct.
- If the frontend cannot load books, confirm the backend is running on port `8080`.
- If port `3000` or `8080` is busy, stop the other process or update the configuration.
- If `npm start` reports missing packages, run `npm install` inside `frontend`.
- If the database is empty, insert books into the `books` table before testing Catalogue.

## Academic Use

This project is intended for learning and demonstration purposes.

