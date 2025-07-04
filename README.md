# 🎟️ MOVIE TICKET BOOKING SYSTEM
A modern full-stack Movie Ticket Booking System 🎬 inspired by BookMyShow – built with React.js, Spring Boot, and MongoDB.

## 🚀 Features
🔍 Browse Movies & Events

🪑 Seat Selection with Real-time UI

💳 Secure Checkout

👤 User Login & JWT Authentication

📊 Admin Dashboard for Movie Management

📁 MongoDB integration

🌐 Responsive UI using React & Tailwind

📦 Tech Stack

## Layer	Technology
🧠 Frontend	React.js + TypeScript
🏗️ Backend	Spring Boot + Java
💽 Database	MongoDB
🔐 Security	JWT (JSON Web Token)
🎨 UI Style	Tailwind CSS + ShadCN

## 🧾 Project Structure

<div style="font-family: monospace;">

<b>movie-ticket-booking-system</b>/<br>
&nbsp;&nbsp;├── <b>backend/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>src/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>controller/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>model/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>repository/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>service/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── <b>security/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>application.properties</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── <b>pom.xml</b><br>
<br>
&nbsp;&nbsp;├── <b>frontend/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>public/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>src/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>components/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>pages/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>services/</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── <b>App.tsx</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── <b>tailwind.config.js</b><br>
&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── <b>package.json</b><br>
<br>
&nbsp;&nbsp;├── <b>README.md</b><br>
&nbsp;&nbsp;└── <b>.env</b><br>

</div>

## 🔧 Setup Instructions
**1.** 📥 Clone the Repo

```
git clone https://github.com/yourusername/movie-ticket-booking-system.git
cd movie-ticket-booking-system
```

**2.** 🧠 Backend (Spring Boot + MongoDB)
```
cd backend
```
**3.** ✅ Configure MongoDB
Edit application.properties:

**4.** properties
```
spring.data.mongodb.uri=mongodb://localhost:27017/moviebooking
jwt.secret=mysecretkey
```

**5.** ▶️ Run the Server
```
./mvnw spring-boot:run
```

**6.** 💻 Frontend (React + Tailwind)
```
cd frontend
npm install
npm run dev
```
**7.** 🔐 Authentication Flow
Signup/Login → JWT Token stored in LocalStorage

Secure APIs protected via Bearer token in Authorization header

## 📊 MongoDB Sample Schema
```json
{
  "title": "Interstellar",
  "language": "English",
  "duration": "2h 49m",
  "availableSeats": 120,
  "screen": "Screen 1",
  "showtime": "2025-07-03T18:00:00Z"
}
```

## Screenshots
<img src="https://github.com/user-attachments/assets/ddb37955-b38a-466b-a794-36de93622439">
<img src="https://github.com/user-attachments/assets/ff625c17-cb24-4b25-8fb0-c150c762fab7">
