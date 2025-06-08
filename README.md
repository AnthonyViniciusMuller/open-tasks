# 🧩 Open Tasks


### Index

- [Summary](#-summary)
- [How to Run](#-how-to-run)
- [Alternatively you can install natively](#-alternatively-you-can-install-natively)
- [Planning](#-planning)

## 🗂️ Summary

A simple Task Management app to help you stay organized. Create, update, complete and delete tasks with ease.

Each subproject has its own README with more details:

- [`/frontend`](./frontend/README.md) 
- [`/backend`](./backend/README.md)

## 🚀 How to Run

You can spin up the full environment locally using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/AnthonyViniciusMuller/open-tasks.git
cd open-tasks

# Start all services
docker-compose up --build
```

## 📦 Alternatively you can install natively 

The following tools and runtimes are required to work with this project locally:

| Tool            | Version      
|-----------------|--------------
| Node.js         | >= 22        
| Express         | >= 5         
| Prisma          | >= 6         
| Postgres        | >= 17
| Angular CLI     | >= 19        

> Ensure all dependencies are installed and available in your `PATH`.

## 📊 Planning

The following diagrams provide a visual overview of the thinking process used to build the system:

- **Use Case Diagrams**

![auth](./docs/usecases/auth.drawio.svg)
![tasks](./docs/usecases/tasks.drawio.svg)

- **Class Diagram**

![tasks](./docs/class/tasks.drawio.svg)