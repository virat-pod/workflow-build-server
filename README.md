# ⚙️ Workflow Builder – Backend

A robust backend built with **Express.js** and **MongoDB** that powers the Workflow Builder app. It handles authentication, task management, XP system, streak tracking, and user data.

---

## 🚀 Features

* 🔐 User Authentication (integrated with frontend auth)
* ✅ CRUD APIs for Tasks
* 🔄 Toggle Task Completion
* 🎮 XP System (gain/lose XP on task actions)
* 🏆 Badge System (milestone-based rewards)
* 🔥 Streak Tracking (daily consistency logic)
* 👤 User Profile Management
* ⚡ RESTful API architecture

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **dotenv**

---

## 📦 Installation

```bash
git clone https://github.com/virat-pod/workflow-build-server.git
cd workflow-build-server
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 🚀 Running the Server

```bash
npm run dev
```

👉 Server runs on:
`http://localhost:5000`

---

## 📡 API Routes

### 📝 Todos

| Method | Route                | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/todo?user=email`   | Get user tasks         |
| POST   | `/todo`              | Create new task        |
| PATCH  | `/todo/:id/complete` | Toggle task completion |
| PATCH  | `/todo/:id/edit`     | Edit task content      |

---

### 👤 User

| Method | Route          | Description    |
| ------ | -------------- | -------------- |
| PATCH  | `/user/update` | Update profile |

---

## 🧠 Core Logic

### 🎮 XP System

* +10 XP on task completion
* Optional XP deduction on un-complete
* Badge unlocking based on XP thresholds

---

### 🏆 Badge System

| XP   | Badge   |
| ---- | ------- |
| 100  | Starter |
| 200  | Builder |
| 500  | Pro     |
| 1000 | Elite   |

---

### 🔥 Streak System

* Increases when user completes task daily
* Resets if a day is missed
* Based on `lastCompletedDate`

---

## 📁 Project Structure

```
/config
  connectDB.js
/controllers
  todosController.js
/service
  todosService.js
/models
  user.js
  todo.js
/router
  todosRouter.js
server.js
```

---

## 🔗 Integration

Frontend connects via:

```js
process.env.NEXT_PUBLIC_SERVER_URL
```

---

## ⚠️ Notes

* Ensure MongoDB is running or use cloud DB (MongoDB Atlas)
* Always validate request data
* Avoid sending sensitive data in query params

---

## 💡 Future Improvements

* 🔐 JWT/Auth middleware for secure APIs
* 📊 Analytics (task completion trends)
* 🔔 Notifications system
* 🧠 Smart task suggestions

---

## 🙌 Author

Built with 💻 by **Virat**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
