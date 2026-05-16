# Urban Traffic Management System

## Architecture Microservices avec GraphQL

### Prérequis

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL
- Redis

### Installation

1. Cloner le repository

```bash
git clone <https://github.com/Aymen10XP/urban-traffic-management.git>
cd urban-traffic-management
npm i
```

---

### **How to Start the Project**

You have **two options**:

#### **Option 1: Docker (recommended — runs everything)**

```
docker-compose up -d        # or: npm run docker:up

# for postgres and redis in case of the above command's error
docker-compose up -d postgres redis
```

This spins up Postgres, Redis, all 5 services, and the API gateway.

#### **Option 2: Local dev (individual services)**

```
npm run dev:gateway         # API Gateway on :4000
npm run dev:auth            # Auth Service on :3001
npm run dev:vehicle         # Vehicle Service on :3002
npm run dev:traffic         # Traffic Service on :3003
npm run dev:incident        # Incident Service on :3004
npm run dev:notification    # Notification Service on :3005
npm run dev:all             # ALL of the above simultaneously
```

#### **In browser:**

```
# Test locally:
localhost:[PORT]/graphql
```

 