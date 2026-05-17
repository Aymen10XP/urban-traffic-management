# Apollo Sandbox Scenarios

Use this endpoint in Apollo Sandbox:

```text
http://localhost:4000/graphql
```

Add your JWT once in the Sandbox `Headers` panel:

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

## Main Demo Scenario

### 1. Register an Admin

```graphql
mutation RegisterAdmin {
  register(
    input: {
      email: "admin_demo@example.com"
      username: "admin_demo"
      password: "Admin123!"
      role: ADMIN
    }
  ) {
    token
    user {
      id
      email
      username
      role
    }
  }
}
```

If the user already exists, use the login mutation instead.

### 2. Login

```graphql
mutation LoginAdmin {
  login(
    input: {
      email: "admin_demo@example.com"
      password: "Admin123!"
    }
  ) {
    token
    user {
      id
      email
      username
      role
    }
  }
}
```

### 3. Verify Authentication

```graphql
query Me {
  me {
    id
    email
    username
    role
  }
}
```

```graphql
query Users {
  users {
    id
    email
    username
    role
  }
}
```

### 4. Create a Vehicle

```graphql
mutation CreateVehicle {
  createVehicle(
    input: {
      licensePlate: "TU-2026-DEMO"
      make: "Toyota"
      model: "Corolla"
      year: 2022
      status: ACTIVE
    }
  ) {
    id
    licensePlate
    make
    model
    year
    status
  }
}
```

### 5. Record Simulated GPS Positions

Replace `vehicleId` with the ID returned above.

```graphql
mutation RecordVehiclePosition1 {
  recordVehiclePosition(
    input: {
      vehicleId: 1
      latitude: 36.8065
      longitude: 10.1815
    }
  ) {
    id
    vehicleId
    latitude
    longitude
    recordedAt
  }
}
```

```graphql
mutation RecordVehiclePosition2 {
  recordVehiclePosition(
    input: {
      vehicleId: 1
      latitude: 36.8110
      longitude: 10.1760
    }
  ) {
    id
    vehicleId
    latitude
    longitude
    recordedAt
  }
}
```

### 6. Query Vehicle History

```graphql
query VehicleHistory {
  vehicleMovementHistory(vehicleId: 1) {
    id
    vehicleId
    latitude
    longitude
    recordedAt
  }
}
```

### 7. Create a Traffic Zone

```graphql
mutation CreateTrafficZone {
  createTrafficZone(
    input: {
      name: "Centre Ville Demo"
      density: 25
      location: "Tunis Centre"
    }
  ) {
    id
    name
    density
    congestionLevel
    isCongested
    location
  }
}
```

### 8. Measure Traffic Density

Replace `zoneId` with the ID returned above.

```graphql
mutation MeasureTrafficDensity {
  measureTrafficDensity(
    input: {
      zoneId: 1
      density: 82
    }
  ) {
    id
    name
    density
    congestionLevel
    isCongested
  }
}
```

### 9. Show Congested Zones

```graphql
query CongestedZones {
  congestedTrafficZones {
    id
    name
    density
    congestionLevel
    isCongested
  }
}
```

### 10. Create an Incident

```graphql
mutation CreateIncident {
  createIncident(
    input: {
      title: "Accident Centre"
      description: "Collision near central avenue"
      location: "Tunis Centre"
      type: ACCIDENT
    }
  ) {
    id
    title
    type
    status
    location
  }
}
```

### 11. Update Incident Status

Replace `id` with the incident ID returned above.

```graphql
mutation UpdateIncidentStatus {
  updateIncidentStatus(id: 1, status: EN_COURS) {
    id
    title
    type
    status
  }
}
```

### 12. Send a Notification

```graphql
mutation SendNotification {
  sendNotification(
    input: {
      message: "Incident Centre Ville en cours de traitement"
      type: ALERTE
    }
  ) {
    id
    message
    type
    isRead
    createdAt
  }
}
```

### 13. Mark Notification as Read

Replace `id` with the notification ID returned above.

```graphql
mutation MarkAsRead {
  markAsRead(id: 1) {
    id
    message
    type
    isRead
  }
}
```

### 14. Final State Queries

```graphql
query Vehicles {
  vehicles {
    id
    licensePlate
    make
    model
    year
    status
  }
}
```

```graphql
query TrafficZones {
  trafficZones {
    id
    name
    density
    congestionLevel
    isCongested
    location
  }
}
```

```graphql
query Incidents {
  incidents {
    id
    title
    type
    status
    location
  }
}
```

```graphql
query Notifications {
  notifications {
    id
    message
    type
    isRead
    createdAt
  }
}
```

## Additional CRUD Operations

### Auth User Management

```graphql
mutation UpdateUser {
  updateUser(
    input: {
      id: "PASTE_USER_UUID_HERE"
      username: "admin_demo_updated"
      role: ADMIN
    }
  ) {
    id
    email
    username
    role
    updatedAt
  }
}
```

```graphql
mutation RemoveUser {
  removeUser(id: "PASTE_USER_UUID_HERE")
}
```

### Vehicle CRUD

```graphql
query VehicleById {
  vehicle(id: 1) {
    id
    licensePlate
    make
    model
    year
    status
  }
}
```

```graphql
mutation UpdateVehicle {
  updateVehicle(
    input: {
      id: 1
      model: "Corolla Cross"
      status: IN_MAINTENANCE
    }
  ) {
    id
    licensePlate
    make
    model
    year
    status
  }
}
```

```graphql
mutation RemoveVehicle {
  removeVehicle(id: 1)
}
```

### Traffic Zone CRUD

```graphql
query TrafficZoneById {
  trafficZone(id: 1) {
    id
    name
    density
    congestionLevel
    isCongested
    location
  }
}
```

```graphql
mutation UpdateTrafficZone {
  updateTrafficZone(
    id: 1
    input: {
      name: "Centre Ville Demo Updated"
      density: 55
      location: "Tunis Centre El Hana"
    }
  ) {
    id
    name
    density
    congestionLevel
    isCongested
    location
  }
}
```

```graphql
mutation RemoveTrafficZone {
  removeTrafficZone(id: 1) {
    id
    name
  }
}
```

### Incident CRUD

```graphql
query IncidentById {
  incident(id: 1) {
    id
    title
    description
    location
    type
    status
  }
}
```

```graphql
mutation UpdateIncident {
  updateIncident(
    id: 1
    input: {
      title: "Accident Centre Mis a Jour"
      description: "Traffic police have secured the area"
      location: "Tunis Centre"
      type: EMBOUTEILLAGE
      status: RESOLU
    }
  ) {
    id
    title
    description
    location
    type
    status
  }
}
```

```graphql
mutation RemoveIncident {
  removeIncident(id: 1) {
    id
    title
    status
  }
}
```

### Notification CRUD

```graphql
mutation UpdateNotification {
  updateNotification(
    id: 1
    input: {
      message: "Incident resolu et circulation retablie"
      type: INFO
      isRead: false
    }
  ) {
    id
    message
    type
    isRead
    createdAt
  }
}
```

```graphql
mutation RemoveNotification {
  removeNotification(id: 1)
}
```

## Useful Validation and Security Checks

No JWT:

```graphql
query VehiclesWithoutJwt {
  vehicles {
    id
    licensePlate
  }
}
```

Invalid vehicle input:

```graphql
mutation InvalidVehicleInput {
  createVehicle(
    input: {
      licensePlate: ""
      make: "Ford"
      model: "Fiesta"
      year: 1800
      status: ACTIVE
    }
  ) {
    id
  }
}
```

Operator forbidden on admin query:

```graphql
query UsersAsOperator {
  users {
    id
    email
    role
  }
}
```

Expected behavior:

- missing JWT returns `UNAUTHENTICATED`
- invalid input returns `BAD_REQUEST`
- `OPERATOR` cannot access the admin-only `users`, `updateUser`, or `removeUser` operations
