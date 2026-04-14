import express from "express";
import handler from "../service/copilotService.js";

const router = express.Router();

router.use("/copilot", handler);

export default router;