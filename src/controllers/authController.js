import bcrypt from "bcrypt";
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

export class AuthController {
  // User registration
  static async register(req, res) {
    try {
      const { username, password, emailId } = req.body;

      // Check for missing fields
      if (!username || !password || !emailId) {
        return res
          .status(400)
          .json({ message: "Username, password, and emailId are required" });
      }

      // Check if user already exists
      const existingUser = await userModel.findOne({ emailId });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new userModel({
        userName: username,
        emailId,
        password: hashedPassword,
        isVerified: true, // Set to false if verification is needed
      });

      // Save the user to the database
      await user.save();

      // Send success response
      return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.userName) {
        // Handle duplicate userName error
        return res.status(400).json({ message: "Username already exists" });
      }
      // Handle any other errors
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // User login
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Check for missing fields
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      // Find the user by username
      const user = await userModel.findOne({ userName: username });

      // Check if user exists
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Compare the provided password with the stored hash
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // Check if the user is verified
      if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { _id: user._id, userName: user.userName, emailId: user.emailId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Send token in the response
      return res
        .status(200)
        .header("x-auth-token", token)
        .json({ token, user });
    } catch (err) {
      // Handle server errors
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
