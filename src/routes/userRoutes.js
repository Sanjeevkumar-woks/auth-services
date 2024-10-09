import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { UserControllers } from "../controllers/userController.js";

const userRoutes = Router();

// Get users Route only id authenticated
//Check authentication by passing the auth middleware
userRoutes.get("/getUserById", authMiddleware, UserControllers.getUserById);

//Get all users only if user is Authenticated
//Check authentication by passing the auth middleware
userRoutes.get("/getAllUsers", authMiddleware, UserControllers.getAllUsers);

export default userRoutes;
