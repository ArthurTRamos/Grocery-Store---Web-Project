import express from "express";
import http from "http";
import cors from "cors";

// Import database models for different entities
import Coupon from "./Models/Coupon.js";
import Product from "./Models/Product.js";
import User from "./Models/User.js";

// Import database connection function
import connectDB from "./connectDB.js";

const app = express();
const port = 3000;

// CORS configuration to allow requests from React frontend
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL (Vite default port)
  optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Establish database connection
connectDB();

// Enable JSON parsing with 50MB limit for large image uploads
app.use(express.json({ limit: '50mb' }));

// ================================
// COUPON ROUTES - CRUD Operations
// ================================

// GET all coupons
app.get("/coupon", async (req, res) => {
  try {
    const posts = await Coupon.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single coupon by ID
app.get("/coupon/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Coupon.findById(id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST create new coupon(s) - accepts array of coupons
app.post("/coupon", async (req, res) => {
  try {
    // Convert each item in array to Coupon model instance
    const newObject = req.body.map((item) => new Coupon(item));
    // Insert multiple coupons at once
    const savedProject = await Coupon.insertMany(newObject);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update existing coupon by ID
app.put("/coupon/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find and update coupon, return updated document
    const updatedPost = await Coupon.findByIdAndUpdate(id, updatedData, {
      new: true, // Return updated document
      runValidators: true, // Run schema validation
    });

    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE coupon by ID
app.delete("/coupon/:id", async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).json({ message: "Post deleted", deleted });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ================================
// PRODUCT ROUTES - CRUD Operations
// ================================

// GET all products
app.get("/product", async (req, res) => {
  try {
    const posts = await Product.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product by ID
app.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Product.findById(id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST create new product(s) - accepts array of products
app.post("/product", async (req, res) => {
  try {
    // Convert each item in array to Product model instance
    const newObject = req.body.map((item) => new Product(item));
    // Insert multiple products at once
    const savedProject = await Product.insertMany(newObject);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update existing product by ID
app.put("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find and update product, return updated document
    const updatedPost = await Product.findByIdAndUpdate(id, updatedData, {
      new: true, // Return updated document
      runValidators: true, // Run schema validation
    });

    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE product by ID
app.delete("/product/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).json({ message: "Post deleted", deleted });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ================================
// USER ROUTES - CRUD Operations
// ================================

// GET all users
app.get("/user", async (req, res) => {
  try {
    const posts = await User.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await User.findById(id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST create new user(s) - accepts array of users (registration endpoint)
app.post("/user", async (req, res) => {
  try {
    console.log("Creating new user(s)"); // Debug log for user creation
    // Convert each item in array to User model instance
    const newObject = req.body.map((item) => new User(item));
    console.log(newObject); // Debug log to see user data
    // Insert multiple users at once
    const savedProject = await User.insertMany(newObject);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update existing user by ID
app.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find and update user, return updated document
    const updatedPost = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // Return updated document
      runValidators: true, // Run schema validation
    });

    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE user by ID
app.delete("/user/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).json({ message: "Post deleted", deleted });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create HTTP server and start listening on specified port
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});