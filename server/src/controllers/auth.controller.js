import bcrypt from "bcrypt";
import { registerSchema } from "../schemas/auth.schema.js";
import {
  findUserByEmail,
  createUser,
} from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { loginSchema } from "../schemas/auth.schema.js";

export async function register(req, res) {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await findUserByEmail(data.email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await createUser({
      email: data.email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      userId: user.id,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const data = loginSchema.parse(req.body);

    const user = await findUserByEmail(data.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
}