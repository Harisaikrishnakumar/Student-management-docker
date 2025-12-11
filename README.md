System Architecture

This project follows a 3-tier production-style architecture, fully containerized using Docker Compose. Each component runs inside its own isolated container, allowing clean separation of concerns, better scalability, and easier deployments.

📌 Architecture Diagram
┌───────────────────────────────┐
│         Frontend (Nginx)       │
│  HTML • CSS • JavaScript       │
│  served on port 80             │
└───────────────▲───────────────┘
                │ HTTP (Port 80)
                ▼
┌───────────────────────────────┐
│     Backend (Spring Boot)     │
│ REST API • JPA • Hibernate    │
│ Runs on port 8080             │
└───────────────▲───────────────┘
                │ JDBC (5432)
                ▼
┌───────────────────────────────┐
│     PostgreSQL Database       │
│ studentDB (persistent volume) │
└───────────────────────────────┘

🔍 Architecture Explanation
1️⃣ Frontend — Nginx

Serves the UI (HTML, CSS, JavaScript)

Exposed on port 80

Uses Nginx, a high-performance production web server

Sends all user requests to the backend REST API

2️⃣ Backend — Spring Boot

Written in Java 17 using Spring Boot

Exposed internally on port 8080

Implements complete CRUD operations for managing student data

Uses Spring MVC, Spring Data JPA, and Hibernate ORM

Communicates with PostgreSQL using JDBC

3️⃣ Database — PostgreSQL

Stores student records in a relational schema

Uses Docker persistent volumes to retain data

Accepts connections on port 5432

🔗 Inter-Service Communication
Layer	Protocol	Port
Frontend → Backend	HTTP	80 → 8080
Backend → Database	JDBC	8080 → 5432

All services communicate through Docker’s internal network using service names, creating a clean and production-like environment.

🎯 Why This Architecture is Important

This setup demonstrates:

Real-world multi-tier architecture

Full-stack development with clean separation

Containerized deployment using Docker Compose

Internal networking, environment variables, and persistent storage

Scalable, modular system design used in modern software companies
