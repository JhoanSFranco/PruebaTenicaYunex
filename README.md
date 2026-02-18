# ITS Traffic Management System - Yunex

A full-stack application for managing Intelligent Transportation Systems (ITS) equipment and road segments.

## Architecture

**Monolithic Architecture** with three main components:

- **Database**: PostgreSQL 15 running in Docker
- **Backend**: Spring Boot 3.x (Java) with REST API
- **Frontend**: React 18 + TypeScript + Vite

**Communication**: HTTP/REST with JSON payloads

**Key Technologies**:
- Backend: Spring Boot, JPA/Hibernate, Maven
- Frontend: React, TypeScript, CSS Modules
- Database: PostgreSQL with bidirectional JPA relationships

## Installation

### Prerequisites
- Docker and Docker Compose (for running the application)
- Node.js 18+ and npm
- Java 17+ (optional - for local backend development)
- Maven (included via `mvnw` wrapper)

### 1. Start Backend & Database
```bash
cd backend
.\mvnw.cmd clean package -DskipTests
docker-compose up --build
```
This will start:
- PostgreSQL database on port `5432`
- Spring Boot backend on port `8080`

**Note**: Tests use H2 in-memory database and don't require Docker.

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend will be available at `http://localhost:5173`

## Running & Testing

### Access the Application
1. Open browser at `http://localhost:5173`
2. Navigate between two main views:
   - **🚦 ITS Equipment**: Manage ITS devices (CRUD operations)
   - **🛣️ Road Segments**: Manage road segments with associated ITS

### Backend API Endpoints

#### ITS Equipment Endpoints
- `GET /its` - List all ITS equipment
- `POST /its` - Create new ITS device
- `PUT /its/{id}` - Update existing ITS
- `DELETE /its/{id}` - Delete ITS device

#### Road Segment Endpoints
- `GET /road-segments` - List all road segments
- `POST /road-segments` - Create new road segment
- `PUT /road-segments/{id}` - Update road segment
- `DELETE /road-segments/{id}` - Delete road segment
- `POST /road-segments/{segmentId}/assign-its/{itsId}` - Assign ITS to segment
- `GET /road-segments/{segmentId}/its` - Get all ITS devices for a segment

### API Usage Examples

#### Example 1: Create ITS Equipment
```bash
POST http://localhost:8080/its
Content-Type: application/json

{
  "type": "Cámara CCTV",
  "location": "Km 5 Autopista Norte",
  "status": "Activo",
  "instalation_date": "2024-01-15",
  "roadSegment": null
}
```

#### Example 2: Create Road Segment
```bash
POST http://localhost:8080/road-segments
Content-Type: application/json

{
  "name": "Autopista Norte Sector 1",
  "location": "Bogotá - Km 0 a Km 15",
  "length": 15.5,
  "condition": "Excelente"
}
```

#### Example 3: Assign ITS to Road Segment
```bash
POST http://localhost:8080/road-segments/1/assign-its/1
```

### Application Use Cases

**Use Case 1: Traffic Monitoring Setup**
1. Create a new road segment (e.g., "Autopista Norte Sector 1")
2. Install multiple ITS devices (cameras, speed sensors)
3. Assign each ITS device to the road segment
4. Monitor equipment status from the dashboard

**Use Case 2: Equipment Maintenance**
1. Navigate to ITS Equipment view
2. Filter devices by status (Active/Inactive/Maintenance)
3. Update device status when maintenance is required
4. Track installation dates and service history

**Use Case 3: Road Segment Analysis**
1. Open Road Segments view
2. Select a segment to view all associated ITS equipment
3. Review segment condition and length
4. Update segment condition based on inspections

**Use Case 4: Equipment Relocation**
1. Edit an ITS device
2. Change the assigned road segment
3. System prevents duplicate assignments
4. View updated associations in both views



## Unit Testing

### Backend Tests (Spring Boot)
Tests use **H2 in-memory database** and don't require Docker to be running:

```bash
cd backend
./mvnw test
```

Test coverage includes:
- `BackendApplicationTests`: Spring context loading
- `ITSServiceTest`: ITS business logic (7 tests)
- `RoadSegmentServiceTest`: Road segment operations (12 tests)

**Total: 20 tests** covering CRUD operations, validations, and error handling.

### View Test Results
```bash
# Results in: target/surefire-reports/
# Or run with detailed output:
./mvnw test -X
```

## Author

**Jhoan Franco**  
Email: jhfrancor@unal.edu.co  
Technical Assessment - Yunex Traffic Solutions 
