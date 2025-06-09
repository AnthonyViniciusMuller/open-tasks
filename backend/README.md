# 🧩 Open Tasks

### Index

- [Summary](#-summary)
- [Features](#-features)
- [How to Run](#-how-to-run)
- [Dependencies](#-dependencies)
- [Scripts](#-scripts)

## 🗂️ Summary

This is the backend service for **Open Tasks**, a simple Task Management application. It provides a RESTful API to manage users, authentication, and tasks.

## ✨ Features

- User authentication (JWT-based)
- Create, update, complete, and delete tasks
- PostgreSQL integration via Prisma ORM
- RESTful API using Express


## 🚀 How to Run

```bash
# Install dependencies
npm install

# Setup the database
npx prisma generate
npx prisma migrate dev

# Run the development server
npm run dev
```

## 📦 Dependencies 

The following tools and runtimes are required to work with this project locally:

| Tool            | Version      
|-----------------|--------------
| Node.js         | >= 22        
| Express         | >= 5         
| Prisma          | >= 6         
| Postgres        | >= 17

> Ensure all dependencies are installed and available in your `PATH`.

## 📜 Scripts

| Command                  | Description                              |
|--------------------------|------------------------------------------|
| `npm run dev`            | Start development server (with Nodemon)  |
| `npm run build`          | Compile TypeScript                       |
| `npx prisma generate`    | Generate Prisma client                   |
| `npx prisma migrate dev` | Run local development migration          |
