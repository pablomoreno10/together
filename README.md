# ⚽ FC Together

**FC Together** is a full-stack team productivity platform built for the Rutgers Newark Men’s Soccer team to streamline **scheduling**, **task management**, and **real-time communication** between players and staff.

Built to address real needs during our NCAA season, this app centralizes everything from calendars and to-dos to messages and reminders; helping teammates stay in sync without relying on scattered group chats or clunky spreadsheets.

> 🧠 Made for athletes  
> 🌐 Frontend deployed on **Vercel** · Backend hosted on **AWS EC2**

---

## 🚀 Features

- 🔐 **Role-Based Auth** — JWT login system with `player`, `captain`, and `admin` access levels  
- 📅 **Google Calendar Sync** — Full calendar integration via GCP OAuth2 (two-way sync)  
- 📬 **Email Notifications** — Auto-emails triggered on event creation and updates (NodeMailer)  
- 💬 **Real-Time Chat** — Socket.io messaging system with sender IDs and timestamps  
- ✅ **To-Do Tracking** — Task assignments, completions, and team leaderboard  
- 📊 **Engagement Dashboard** — Visuals on event/task activity and team involvement  
---

## 🧱 Architecture

    Frontend (React + Vercel)
            ↓
    API Requests via Axios
            ↓
    Backend (Node.js + Express on AWS EC2)
            ↓
    MongoDB Atlas (NoSQL DB)
            ↓
    Google Calendar API (GCP)
            ↕
    Socket.io (Real-Time Messaging)

---

## 🛠️ Tech Stack

| Layer             | Technology               | Why It Was Used                                                                 |
|------------------|---------------------------|----------------------------------------------------------------------------------|
| Frontend         | React + Vite              | Lightweight, fast component-based architecture                                  |
| Styling          | Tailwind CSS              | Utility-first CSS for responsive, clean interfaces                              |
| Backend          | Node.js + Express.js      | RESTful API structure with async capabilities                                   |
| Database         | MongoDB Atlas             | Cloud-hosted NoSQL database, flexible for fast iteration                        |
| Authentication   | JWT                       | Stateless, secure token-based authentication with role control                  |
| Email Service    | NodeMailer                | Handles auto email notifications for event workflows                            |
| Calendar Sync    | Google Calendar API (GCP) | OAuth2 + seamless two-way syncing with user calendars                           |
| Real-Time Engine | Socket.io                 | Enables live messaging and broadcast-style chat                                 |
| Deployment       | AWS EC2 (Backend)         | Full manual deployment with SSH, NGINX, and process management                  |
| Deployment       | Vercel (Frontend)         | Serverless CI/CD deployment for fast iteration and hosting                      |

---

## 📦 Setup Instructions

### 1) Clone the repository

git clone https://github.com/pablomoreno10/together.git
cd together
2) Install dependencies
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
### 3) Create environment variables  
Create a `.env` file inside `/server/` with the following:
    
    MONGO_URI=your_mongodb_atlas_uri
    JWT_SECRET=your_jwt_secret_key
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_app_password
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

as well as an '.env' inside '/client/' with:
    VITE_BACKEND_URL=backend


### 4) Run the project locally
    # Start backend server
    cd server
    nodemon server.js

    # In a new terminal, start frontend dev server
    cd client
    npm run dev

---

## 🌐 Live Demo

🔗 https://together-beta.vercel.app  
_(Demo credentials available upon request)_

---

## 📬 Why I Built This

As a student-athlete, I often saw how easily things got lost in communication such as players missing practices, to-dos forgotten, schedules misaligned.

**FC Together** was my response to that chaos.  
A centralized, secure platform tailored for sports teams, with real teammates actively shaping its design.

This project helped me grow as a full-stack developer while solving a real-world problem, and I’m proud to continue improving it.

---

## 🧠 What I Learned

- 🔧 **Infrastructure** — Set up Node.js app on AWS EC2, configured NGINX and system processes  
- 🔒 **Security** — Implemented JWT authentication, protected routes, rate limiting, CORS, and role-based access  
- 📡 **API Integration** — Worked with GCP Calendar APIs  
- 🧠 **Product Design** — Designed features based on live input from athletes and coaches  
- 📈 **Fullstack Engineering** — Learned how to architect, build, and deploy a scalable full-stack app

---

## 🤝 Acknowledgments

Thanks to my teammates at **Rutgers Newark Men’s Soccer**.

---

## 👤 Author

**Pablo Moreno**  
Computer Science @ Rutgers University–Newark  
📫 pm896@rutgers.edu  
🌐 LinkedIn: https://linkedin.com/in/pablomoreno10 
🐙 GitHub: https://github.com/pablomoreno10
