import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import { connectDB } from "./config/connectDB.js";
import todo from "./router/todosRouter.js";
import user from "./router/userRouter.js";
import copilot from "./router/copilotRoute.js";

const app = express();
const port = 5000;

const corsOptions = { origin: process.env.FRONTEND_URL };
app.use(cors(corsOptions));

app.use(express.json());

app.use("/todo", todo);

app.use("/user", user);

app.use("/ai", copilot);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
