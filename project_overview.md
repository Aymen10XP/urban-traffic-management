# Project Overview: Urban Traffic Management System

### 🎯 Objective
This project is an **Urban Traffic Management System**. Its primary goal is to provide a comprehensive, scalable backend architecture for monitoring and managing city traffic, vehicles, incidents, and notifications. It is built as a set of distributed **microservices** that expose a unified **GraphQL** API.

### 🏗️ Architecture & Roles (Microservices)
The system is built using **NestJS** and **TypeScript**, relying on a microservices architecture. It uses **PostgreSQL** as the primary relational database and **Redis** for caching or pub/sub capabilities.

The different roles in the system are divided into specialized services:

1. **`api-gateway` (Port 4000)**: 
   - Acts as the central entry point for all client requests.
   - It uses Apollo Server and Apollo Gateway to aggregate (federate) the GraphQL schemas from all the sub-services into one single `supergraph`.
2. **`auth-service` (Port 3001)**: 
   - Manages user identities, registration, login, and access control. 
   - It issues JSON Web Tokens (JWT) for authentication and defines user roles (e.g., `ADMIN`) using Guards (`JwtAuthGuard`, `RolesGuard`).
3. **`vehicle-service` (Port 3002)**: 
   - Responsible for managing vehicle-related data within the traffic system.
4. **`traffic-service` (Port 3003)**: 
   - Handles the core traffic data, likely monitoring traffic flow, congestion, or traffic light states.
5. **`incident-service` (Port 3004)**: 
   - Manages the reporting and tracking of traffic incidents (accidents, roadworks, hazards, etc.).
6. **`notification-service` (Port 3005)**: 
   - Responsible for dispatching alerts and notifications to users (likely leveraging Redis to process background events).

### ⚙️ How it Works

1. **Unified GraphQL Interface**: A client application only needs to communicate with the `api-gateway` on port 4000. When a GraphQL query or mutation is sent, the gateway routes the request to the appropriate underlying microservice (or multiple microservices) based on the schema federation.
2. **Authentication Flow**: 
   - A user signs in via a GraphQL mutation routed to the `auth-service`.
   - The `auth-service` verifies the credentials against the PostgreSQL database and returns a JWT.
   - For subsequent requests, the client includes this JWT in the Authorization header. The microservices (like `auth-service` in the `me` query) use `JwtStrategy` and `Passport` to validate the token and extract the user context.
3. **Infrastructure Management**:
   - The entire stack is orchestrated using **Docker Compose** (`docker-compose.yml`).
   - Running `npm run docker:up` or `docker-compose up -d` spins up the `traffic_db` (Postgres), `traffic_redis` (Redis), all 5 NestJS backend microservices, and the API Gateway.
   - They all communicate securely over an internal Docker bridge network (`traffic-network`).
4. **Data Persistence**:
   - The services utilize **TypeORM** to map TypeScript entities (like `User`) to tables in the PostgreSQL database (`traffic_management`).
