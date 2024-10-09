import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

const authRoutes = Router();

// Register Route
authRoutes.post("/register", AuthController.register);

// Login Route
authRoutes.post("/login", AuthController.login);

// export auth Route
export default authRoutes;
