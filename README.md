# Task-Management-App
210041112 Web Dev Cse-4539 Assignment

Home page Screenshot
![image](https://github.com/user-attachments/assets/58321274-f309-4b76-9488-ad9967963c02)

To see the admin role manually change the role of a user in the database to admin.

# Task Management System

## Overview
This Task Management System is a full-stack web application that allows users to create, manage, and categorize tasks efficiently. The system includes user authentication, task categorization, search and filtering options, and different user roles.

## Features

### User Authentication
- **User Registration with Email Verification**: Users must verify their email to complete registration.
- **User Roles**: Different roles implemented, such as admin and regular users.
- **User Login using JWT**: Secure authentication with JSON Web Tokens.
- **Password Security**: Passwords are hashed before storing in the database.

### Task Management
- **Create Tasks**: Users can create tasks with a title, description, due date, and priority level.
- **CRUD Operations**: Users can create, read, update, and delete tasks.
- **Task List**: A comprehensive list of tasks with sorting and filtering options.
- **Task Details**: Users can view detailed information, edit tasks, mark tasks as completed, or delete them.
- **Task Categories**: Users can categorize tasks into different categories.
- **Search and Filters**: Tasks can be searched and filtered by priority, due date, or category.

## Technology Stack

### Backend
- **Express.js**: Handles server-side logic and API endpoints.
- **MongoDB**: Stores task information, including details, due dates, priorities, and categories.
- **JWT**: Implements secure authentication and user session management.
- **BCrypt**: Ensures password hashing for security.

### Frontend
- **HTML, CSS, JavaScript**
- **React.js**

## Installation & Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system
   ```
2. **Install all Dependencies**
   ```bash
   npm run install-all
   ```
3. **Set Up Environment Variables**
   - Create a `.env` file in the backend directory.
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
4. **Start the application**
   ```bash
   npm run dev
   ```
   Go to http://localhost:3000
   
6. **Run the Frontend** (If using React)
   ```bash
   cd frontend
   npm install
   npm start
   ```


