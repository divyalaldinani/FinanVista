# FinanVista
![image](https://github.com/user-attachments/assets/14ad2448-ff8c-4cbd-a0ae-76880c8d9cf2)

A robust finance dashboard application built with the MERN stack and enhanced by machine learning predictions. This project delivers a modern user experience by integrating powerful technologies on both the frontend and backend.

## Table of Contents

- [Demo](#demo)
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Setup](#setup)


## Demo
You can see a live demo of the portfolio website at https://finan-vista.vercel.app/

## Introduction

This application is designed to provide users with a comprehensive financial overview, enriched by machine learning predictions to forecast market trends and other financial insights. The project leverages the power of the MERN stack to create a scalable and maintainable solution:

- **Frontend:**  
  - **Vite:** A fast and lean starter application for React projects, offering instant hot-module replacement and speedy builds.
  - **Redux Toolkit:** Simplifies state management across your app, making it easier to manage and debug state changes.
  - **Material UI:** Provides a robust, accessible, and customizable component library that streamlines the development of a responsive user interface.
  - **Recharts:** Delivers beautiful and customizable charts to visualize financial data and predictions.

- **Backend:**  
  - **Node.js:** Serves as the runtime environment to run JavaScript on the server side.
  - **Express.js:** Acts as the backend framework to build RESTful APIs quickly and efficiently.
  - **MongoDB:** A flexible, NoSQL database that stores financial data and machine learning outputs in a scalable format.

By combining these technologies, the app not only displays real-time financial metrics but also harnesses the power of machine learning to predict future trends, offering actionable insights to its users.

## Features

- **📊 Interactive Dashboard:**  
  Provides key financial metrics, trends, and summaries in an intuitive layout.
  
- **🤖 Machine Learning Predictions:**  
  Delivers data-driven forecasts and insights for future financial trends.
  
- **📱 Responsive UI:**  
  Ensures an optimal experience on both desktop and mobile devices using Material UI.
  
- **🚀 Robust API:**  
  A RESTful backend powered by Express and Node.js that securely handles data transactions.

## Technologies Used

### Frontend

- **Vite** – Fast, modern build tool for the React application.
- **React** – JavaScript library for building user interfaces.
- **Redux Toolkit** – Streamlined state management.
- **Material UI** – Component library for designing a responsive and appealing UI.
- **Recharts** – Library for rendering dynamic charts and visualizations.

### Backend

- **Node.js** – JavaScript runtime for server-side development.
- **Express.js** – Backend framework for building APIs.
- **MongoDB** – NoSQL database for storing financial data and prediction outputs.

### Machine Learning

- **Regression.js** – Utilized to plot a regression line based on historical revenue data and predict future revenue trends.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

**Environment Variables Setup**
The project relies on environment variables for configuration. Follow the instructions below to set up the necessary environment variables:

Client-side Environment Variables
Create a .env file in the client directory and add the following variable:

`VITE_APP_BASE_URL="http://localhost:5000"`
This variable defines the base URL for API requests in the client-side code.

Server-side Environment Variables
Create a .env file in the server directory and add the following variables:

`MONGO_URL="YOUR_MONGODB_URL"`
`PORT=5000`
Ensure to replace YOUR_MONGODB_URL with your actual MongoDB URL. The PORT variable specifies the port number for the server.

Note: Environment variables containing sensitive information like API keys, database credentials, or any other secrets should not be committed to version control. Ensure that the .env files are included in your project's .gitignore file to prevent accidental exposure of sensitive data.

### Setup

1. Clone this repository to your local machine:
`git clone https://github.com/divyalaldinani/FinanVista`
2. Change to the project directory:
`cd FinanVista`
3. Install and run client dependencies:<br>
`cd Client`<br>
`npm install`<br>
`npm run dev`
4. Install and run server dependencies:<br>
`cd Server`<br>
`npm install`<br>
`npm run dev`

5. Open your web browser and visit http://localhost:5173 to see the website in action during development.


