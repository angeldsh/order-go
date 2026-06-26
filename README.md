<div align="center">
  <h1>🍔 Order & Go</h1>
  <p><strong>A Modern, Enterprise-Grade Restaurant Management System</strong></p>
  
  [![Frontend CI](https://github.com/angeldsh/order-go/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/angeldsh/order-go/actions)
  [![Backend CI/CD](https://github.com/angeldsh/order-go/actions/workflows/deploy.yml/badge.svg)](https://github.com/angeldsh/order-go/actions)
  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.1-6DB33F?logo=spring-boot&logoColor=white)](#)
  [![Angular](https://img.shields.io/badge/Angular-16.0-DD0031?logo=angular&logoColor=white)](#)
  [![Ionic](https://img.shields.io/badge/Ionic-7.0-3880FF?logo=ionic&logoColor=white)](#)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](#)
  
</div>

---

## 📖 Overview

**Order & Go** is a full-stack, responsive web application designed to manage restaurant operations end-to-end. It features a scalable **Spring Boot RESTful API** on the backend and a dynamic, cross-platform **Angular + Ionic** frontend.

The architecture follows **Domain-Driven Design (DDD)** principles to separate technical infrastructure (English) from the local business domain (Spanish), a common pattern in European enterprise environments.

### ✨ Key Features

- **Role-Based Authentication (JWT):** Secure login for `ADMIN`, `EMPLOYEE`, and `CUSTOMER` roles.
- **Order Management System:** Real-time state transitions for tickets and orders.
- **Dynamic Product Catalog:** Image upload processing and categorical filtering.
- **Cross-Platform UI:** Fully responsive design built with Ionic UI components and TailwindCSS.
- **Enterprise Testing:** Comprehensive JUnit 5 and Mockito test coverage (`ArgumentCaptor`, Exception testing).
- **Automated CI/CD:** Fully automated GitHub Actions pipelines enforcing tests before deployment.

---

## 🏗️ Architecture & Technologies

### Backend (`/backend`)

- **Java 17 & Spring Boot 3:** Core framework for the REST API.
- **Spring Security & JWT:** Stateless authentication and authorization.
- **Spring Data JPA & Hibernate:** ORM for database interactions.
- **PostgreSQL (Supabase):** Cloud-hosted relational database.
- **JUnit 5 & Mockito:** Advanced unit testing suite.

### Frontend (`/frontend`)

- **Angular 16:** Component-based architecture.
- **Ionic 7:** Cross-platform mobile-first UI components.
- **TailwindCSS:** Utility-first styling for rapid UI development.
- **Karma & Jasmine:** Automated frontend testing.

---

## 🚀 Getting Started (Local Development)

You can run this project locally using **Docker** for the database, or connect it directly to your own Supabase instance.

### Prerequisites

- Node.js (v18+)
- Java JDK 17
- Maven
- Docker & Docker Compose (Optional, for local DB)

### 1. Database Setup (Docker)

To spin up a local PostgreSQL database, simply run:

```bash
docker-compose up -d
```

_Note: Update your backend `.env` or `application.properties` to point to `jdbc:postgresql://localhost:5432/ordergodb` if using Docker._

### 2. Run the Backend

Navigate to the `backend` directory and start the Spring Boot application:

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 3. Run the Frontend

Navigate to the `frontend` directory, install dependencies, and start the Angular server:

```bash
cd frontend
npm install
npm run start
```

The UI will be available at `http://localhost:4200`.

---

## 🧪 Testing & CI/CD

This project demonstrates strong Continuous Integration practices:

- **Backend Pipeline:** On every push, GitHub Actions runs `mvnw test`. If tests pass, the `.jar` is built and deployed to Render.
- **Frontend Pipeline:** On every push to `/frontend`, GitHub Actions runs `npm run test` in Headless Chrome to ensure component stability, followed by a production build verification.

To run tests locally:

```bash
# Backend
cd backend && ./mvnw test

# Frontend
cd frontend && npm run test
```

---

## 👨‍💻 About the Author

Hi, I'm **Ángel del Solar**, a Software Developer with commercial experience building and maintaining business web applications using **Java**, **Spring Boot**, **Angular**, **TypeScript** and **SQL Server**.

I am relocating to **County Kildare, Ireland** in September 2026 and open to **Software Developer**, **Full Stack Developer** and **Java Developer** opportunities.

- Portfolio: https://angeldsh.github.io/
- GitHub: https://github.com/angeldsh
- LinkedIn: [Ángel del Solar](https://www.linkedin.com/in/%C3%A1ngel-del-solar-3380b0244/)

