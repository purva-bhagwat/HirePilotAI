import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from "../schemas/auth.schema.js";
import {
  findUserByEmail,
  createUser,
  updateUser,
} from "../services/auth.service.js";

function getErrorMessage(error) {
  if (error && Array.isArray(error.issues) && error.issues.length > 0) {
    return error.issues[0].message;
  }
  if (error && Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors[0].message;
  }
  return typeof error === "string" ? error : error?.message || "An unexpected error occurred.";
}

export async function register(req, res) {
  try {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: getErrorMessage(parseResult.error),
      });
    }

    const data = parseResult.data;
    const name = data.name || data.fullName;

    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered. Please log in.",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await createUser({
      name,
      email: data.email,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while creating account. Please try again.",
    });
  }
}

export async function login(req, res) {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: getErrorMessage(parseResult.error),
      });
    }

    const data = parseResult.data;
    const user = await findUserByEmail(data.email);

    // Generic error message for both non-existent user and wrong password to prevent email enumeration
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
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

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error.",
      });
    }

    // JWT payload contains only minimal identity: userId and role
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred during login. Please try again.",
    });
  }
}

export async function getMe(req, res) {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("GetMe error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve authenticated user profile.",
    });
  }
}

export async function updateProfile(req, res) {
  try {
    const parseResult = updateProfileSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: getErrorMessage(parseResult.error),
      });
    }

    const { name } = parseResult.data;
    const updatedUser = await updateUser(req.user.id, { name });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
}