const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const Product = require("./models/Product");
const Admin = require("./models/Admin");

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://rare-hope-production-2eb2.up.railway.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


// ========================================
// MONGODB CONNECTION
// ========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// ========================================
// ADMIN AUTH MIDDLEWARE
// ========================================

const protectAdmin = (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired session",
    });
  }
};


// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {
  res.send("Backend is working!");
});


// ========================================
// PUBLIC PRODUCT ROUTES
// ========================================


// GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ONE PRODUCT
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ========================================
// ADMIN LOGIN
// ========================================

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ========================================
// CHECK ADMIN LOGIN
// ========================================

app.get(
  "/api/admin/me",
  protectAdmin,
  async (req, res) => {
    try {
      const admin = await Admin.findById(
        req.admin.adminId
      ).select("-password");

      if (!admin) {
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      res.json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


// ========================================
// ADMIN LOGOUT
// ========================================

app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
  });

  res.json({
    message: "Logged out successfully",
  });
});


// ========================================
// ADMIN PRODUCT ROUTES
// ========================================


// ADD PRODUCT
app.post(
  "/api/products",
  protectAdmin,
  async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,

        discountPrice:
          req.body.discountPrice === "" ||
          req.body.discountPrice === undefined
            ? null
            : req.body.discountPrice,

        discountActive:
          req.body.discountActive ?? false,

        description:
          req.body.description || "",

        stock:
          req.body.stock ?? 0,

        image:
          req.body.image || "",

        active:
          req.body.active ?? true,
      });

      const savedProduct =
        await product.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);


// UPDATE PRODUCT
app.put(
  "/api/products/:id",
  protectAdmin,
  async (req, res) => {
    try {
      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,

            discountPrice:
              req.body.discountPrice === "" ||
              req.body.discountPrice === undefined
                ? null
                : req.body.discountPrice,

            discountActive:
              req.body.discountActive,

            description:
              req.body.description,

            stock:
              req.body.stock,

            image:
              req.body.image,

            active:
              req.body.active,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json(product);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);


// DELETE PRODUCT
app.delete(
  "/api/products/:id",
  protectAdmin,
  async (req, res) => {
    try {
      const product =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message:
          "Product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port ${PORT}`
  );
});