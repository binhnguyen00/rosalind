# Description

A full-stack application for building and managing resumes.

# Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Go](https://go.dev/)
- [PocketBase](https://pocketbase.io/)

# Prerequisites
- [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html)

# Run Commands

### 1. Server-side

Navigate to the [`server`](./server) directory and run PocketBase:

```bash
cd server
go build
./rosalind serve
```

This will start the PocketBase server, typically on `http://localhost:8090`.

### 2. Client-side

Navigate to the [`client`](./client) directory and install dependencies, then start the development server:

```bash
cd client
npm install
npm run dev
```

The client application should then be accessible, typically on `http://localhost:2999`.