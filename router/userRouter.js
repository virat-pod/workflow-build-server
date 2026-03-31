import express from "express";
import { updateChange, deleteAccount } from "../controllers/userController.js";


const router = express.Router();

router.patch("/update", updateChange);

router.delete("/:uid/delete", deleteAccount)




export default router;
