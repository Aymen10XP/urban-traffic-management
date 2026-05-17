# Urban Traffic Management System

## Overview

This project implements a distributed urban traffic management platform using NestJS microservices, GraphQL subgraphs, and an Apollo Gateway.

### Services

- `auth-service`: registration, login, JWT, roles (`ADMIN`, `OPERATOR`)
- `vehicle-service`: vehicle management, simulated GPS positions, movement history
- `traffic-service`: traffic zones, density measurement, congestion detection
- `incident-service`: incident declaration and status management
- `notification-service`: notifications and read tracking
- `api-gateway`: single GraphQL entrypoint for all services

## Prerequisites

- Docker Desktop
- Docker Compose

## Run With Docker

From the project root:

```bash
docker compose up -d --build
```

This starts PostgreSQL, Redis, all five GraphQL services, and the Apollo Gateway.

## Main GraphQL Endpoint

Use Apollo Sandbox, Postman, or ApiDog against:

```text
http://localhost:4000/graphql
```

The individual subgraph endpoints are available for debugging:

- `http://localhost:3001/graphql`
- `http://localhost:3002/graphql`
- `http://localhost:3003/graphql`
- `http://localhost:3004/graphql`
- `http://localhost:3005/graphql`

## Authentication

Most business operations require a JWT.

1. Run `register` or `login`
2. Copy the returned token
3. In Apollo Sandbox, open the `Headers` tab and send:

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

## Demo Flow

Use the ready-to-run scenarios in [APOLLO_SANDBOX_SCENARIOS.md](/D:/tekup/ing%204/sem2/web%20service/project/urban-traffic-management/APOLLO_SANDBOX_SCENARIOS.md).

Recommended order:

1. Register or log in as `ADMIN`
2. Create a vehicle
3. Record two GPS positions
4. Query the vehicle movement history
5. Create a traffic zone
6. Measure traffic density and verify congestion classification
7. Create an incident and update its status
8. Send a notification and mark it as read

## Notes

- PostgreSQL is the required relational database used by the services.
- Redis is available in Docker but is not required for the mandatory assignment flow.
- The gateway is the main endpoint to use during demos and testing.
