# Team Setup Guide

## What This Guide Does

This guide helps you start the project from zero, run all services with Docker, and test the system in Apollo Sandbox.

For more details:

- Ready-to-run GraphQL operations: fel Apollo_Sandbox_Scenarios file.

## Option A: Clone the Project Again

```bash
git clone <repo-url>
cd urban-traffic-management
```

Replace `<repo-url>` with the GitHub repository URL.

## Option B: Pull the Latest Main Branch

If you already have the project:

```bash
git checkout main
git pull origin main
```

## Start the Services With Docker

From the project root, run:

```bash
docker compose up -d --build
```

This starts:

- PostgreSQL
- Redis
- `auth-service`
- `vehicle-service`
- `traffic-service`
- `incident-service`
- `notification-service`
- `api-gateway`

## Verify That the Stack Is Running

Run:

```bash
docker compose ps
```

The main endpoint you need is:

```text
http://localhost:4000/graphql
```

## Open Apollo Sandbox

Open this URL in your browser:

```text
http://localhost:4000/graphql
```

Use the gateway endpoint for normal testing. Do not use the individual service ports unless you are debugging a specific service.

## Get a JWT Token

In Apollo Sandbox:

1. Run `register` or `login`
2. Copy the returned `token`

You can find ready-made operations in [APOLLO_SANDBOX_SCENARIOS.md](/D:/tekup/ing%204/sem2/web%20service/project/urban-traffic-management/APOLLO_SANDBOX_SCENARIOS.md).

## Add the Token to Apollo Headers

In Apollo Sandbox, open the `Headers` panel and paste:

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

Replace `YOUR_JWT_TOKEN` with the token returned by `register` or `login`.

## Run Test Scenarios

Open [APOLLO_SANDBOX_SCENARIOS.md](/D:/tekup/ing%204/sem2/web%20service/project/urban-traffic-management/APOLLO_SANDBOX_SCENARIOS.md) and start with:

- `Main Demo Scenario`

After that, if needed, test:

- `Additional CRUD Operations`

## Stop the Services

When you are done:

```bash
docker compose down
```

## Troubleshooting

- If Docker commands fail, make sure Docker Desktop is open and fully started.
- If port `4000` or `5432` is already in use, stop the conflicting process or container first.
- The first build may take a few minutes because Docker needs to download images and install dependencies.
- If containers are old or something looks broken, restart cleanly:

```bash
docker compose down
docker compose up -d --build
```
