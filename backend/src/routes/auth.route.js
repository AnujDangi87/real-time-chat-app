import express from "express";
import {signup, login, logout} from "../controllers/auth.controller.js";

const router = express.Router();

//using post middleware as the sender will send sensitive data to web
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;