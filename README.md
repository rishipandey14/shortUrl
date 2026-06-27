# 🚀 URL Shortener Backend

A production-inspired URL Shortener backend built using **Node.js**, **Express**, **MongoDB**, **Redis**, and **Queues**. This project goes beyond a basic URL shortener by incorporating caching, asynchronous processing, rate limiting, observability, retries, migrations, and chaos engineering concepts commonly used in large-scale backend systems.

---

## ✨ Features

- 🔗 Generate unique short URLs
- ↩️ Redirect users using short URLs
- 📈 Visit history tracking
- ⚡ Redis caching for ultra-fast lookups
- 🚦 API rate limiting
- 📬 Queue-based background processing
- 🔁 Retry mechanism for failed jobs
- 📊 Metrics & monitoring dashboards
- 🗄️ Database migrations
- 💥 Chaos testing by randomly terminating dependencies
- 🐳 Dockerized services
- 📝 RESTful APIs
- ✅ Robust error handling

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Cache
- Redis

### Queue
- BullMQ / RabbitMQ *(depending on implementation)*

### Monitoring
- Prometheus
- Grafana

### Containerization
- Docker
- Docker Compose

### Utilities
- NanoID
- dotenv
- Nodemon

---

## 📂 Project Structure

```
src/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── queue/
├── metrics/
├── migrations/
├── utils/
└── index.js
```

---

## System Architecture

```
                Client
                   │
                   ▼
          Express REST API
                   │
      ┌────────────┴────────────┐
      ▼                         ▼
   Redis Cache             MongoDB
      │
      ▼
 Cache Miss
      │
      ▼
 MongoDB Lookup
      │
      ▼
 Populate Cache

            │
            ▼

       Queue Workers
            │
            ▼
 Analytics / Logs / Background Jobs

            │
            ▼

     Prometheus Metrics
            │
            ▼
        Grafana Dashboard
```

---

## API Endpoints

### Create Short URL

```
POST /url
```

Request

```json
{
    "redirectURL": "https://google.com"
}
```

Response

```json
{
    "shortId": "Ab3X9Pd"
}
```

---

### Redirect

```
GET /:shortId
```

Redirects to the original URL.

---

### Analytics

```
GET /analytics/:shortId
```

Returns visit statistics.

---

## Caching Strategy

Two Redis mappings are maintained.

```
redirect:https://google.com
        │
        ▼
     Ab3X9Pd
```

```
url:Ab3X9Pd
        │
        ▼
https://google.com
```

Benefits

- Prevent duplicate short URL generation
- Eliminate unnecessary MongoDB queries
- Extremely fast redirection

---

## Queue Usage

Background jobs include:

- Analytics aggregation
- Logging
- Notifications
- Retryable tasks
- Cleanup jobs

---

## Rate Limiting

Protects the API against abuse by limiting the number of requests per client within a configurable time window.

---

## Metrics

The project exposes application metrics including:

- API request count
- Request latency
- Cache hit ratio
- Queue size
- Queue processing time
- Active workers
- MongoDB response time
- Redis response time

---

## Chaos Engineering

A chaos script intentionally disrupts dependencies to test system resilience.

Examples:

- Kill Redis container
- Kill MongoDB container
- Stop Queue workers
- Restart services randomly

The application should recover gracefully.

---

## Getting Started

### Clone

```bash
git clone https://github.com/yourusername/url-shortener-backend.git

cd url-shortener-backend
```

---

### Install

```bash
npm install
```

---

### Configure Environment

Create a `.env`

```env
PORT=7000

MONGO_URI=

REDIS_URL=

QUEUE_URL=
```

---

### Run

```bash
npm run dev
```

---

## Future Improvements

- JWT Authentication
- User Accounts
- Custom Aliases
- URL Expiration
- QR Code Generation
- Click Analytics Dashboard
- Geographic Analytics
- Device Analytics
- Distributed Cache
- Kubernetes Deployment
- CI/CD Pipeline

---

## Learning Goals

This project demonstrates practical implementation of:

- REST APIs
- Backend Architecture
- Redis Caching
- MongoDB
- Queue Systems
- Rate Limiting
- Retry Patterns
- Monitoring
- Metrics Collection
- Docker
- Distributed Systems Concepts
- Fault Tolerance
- Chaos Engineering

---

## License

MIT License