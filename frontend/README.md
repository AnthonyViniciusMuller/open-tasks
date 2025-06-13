# 🧩 Open Tasks Frontend

### Index

- [Summary](#-summary)
- [Disclaimer](#-disclaimer)
- [Features](#-features)
- [How to Run](#-how-to-run)
- [Dependencies](#-dependencies)
- [Scripts](#-scripts)

## 🗂️ Summary

This is the **Angular frontend** for **Open Tasks**, a simple Task Management application. It connects to the backend API to authenticate users and manage their tasks in a clean and intuitive interface.

## ⚠️ Disclaimer

> ⚠️ **Angular 20 introduces new conventions** for how components, services, and other entities are named and organized. For example, TaskComponent becames Task and TaskService also became Task.

> 📝 **TODO**: Reevaluate the folder structure to better align with current Angular best practices — particularly semantics

## ✨ Features

- User authentication (login/logout)
- Task creation, editing, completion, and deletion
- Responsive UI built with Angular components
- API integration using HTTPClient
- State management with RxJS and Signals



## 📦 Dependencies 

The following tools and runtimes are required to work with this project locally:

| Tool            | Version      
|-----------------|--------------
| Node.js         | >= 22        
| Angular CLI     | >= 19         

> Ensure all dependencies are installed and available in your `PATH`.

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Run the development server
ng serve
```