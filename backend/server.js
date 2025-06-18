import express from "express";
import http from "http";
import cors from "cors";

// Import database models for different entities
import Coupon from "./Models/Coupon.js";
import Product from "./Models/Product.js";
import User from "./Models/User.js";

// Import the database connection function from a separate module
import connectDB from "./connectDB.js";

// -- INITIAL SETUP --
const app = express();
const port = 3000;

// -- MIDDLEWARE CONFIGURATION --

// CORS (Cross-Origin Resource Sharing) configuration
// This is necessary to allow your frontend application (running on a different port)
// to make requests to this backend server.
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from the Vite/React frontend
  optionsSuccessStatus: 200,
};

// Apply CORS middleware to all incoming requests
app.use(cors(corsOptions));

// Establish the connection to the database by calling the imported function.
connectDB();

// Enable Express to parse incoming JSON request bodies.
// The limit is increased to 50mb to allow for potentially large payloads, like base64 encoded images.
app.use(express.json({ limit: '50mb' }));

// ================================
// COUPON ROUTES - CRUD Operations
// ================================

// GET all coupons
app.get("/coupon", async (req, res) => {
  try {
    // Fetches all documents from the Coupon collection.
    const posts = await Coupon.find();
    res.status(200).json(posts);
  } catch (error) {
    // Handle potential server errors.
    res.status(500).json({ message: error.message });
  }
});

// GET a single coupon by its ID
app.get("/coupon/:id", async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the URL parameters.
    const post = await Coupon.findById(id);

    if (post) {
      // If found, send the coupon data with a 200 OK status.
      res.status(200).json(post);
    } else {
      // If not found, send a 404 Not Found error.
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    // Handle other errors, like an invalid ID format.
    res.status(400).json({ message: error.message });
  }
});

// POST to create one or more new coupons.
// This endpoint is designed to accept an array of coupon objects in the request body.
app.post("/coupon", async (req, res) => {
  try {
    // Convert each raw object in the request body array into a Mongoose Coupon model instance.
    const newObject = req.body.map((item) => new Coupon(item));
    // Use insertMany for efficient bulk insertion into the database.
    const savedProject = await Coupon.insertMany(newObject);
    res.status(201).json(savedProject); // Send 201 Created status on success.
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update an existing coupon by its ID.
app.put("/coupon/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the coupon by its ID and update it with the new data.
    const updatedPost = await Coupon.findByIdAndUpdate(id, updatedData, {
      new: true, // Option to return the document *after* it has been updated.
      runValidators: true, // Option to run schema validation on the update operation.
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

// DELETE a coupon by its ID.
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
// The structure here is identical to the Coupon routes but operates on the Product model.

// GET all products
app.get("/product", async (req, res) => {
  try {
    const posts = await Product.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single product by its ID
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

// POST to create one or more new products.
app.post("/product", async (req, res) => {
  try {
    const newObject = req.body.map((item) => new Product(item));
    const savedProject = await Product.insertMany(newObject);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update an existing product by its ID.
app.put("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedPost = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
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

// DELETE a product by its ID.
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
// The structure here is identical to the Coupon/Product routes but operates on the User model.

// GET all users
app.get("/user", async (req, res) => {
  try {
    const posts = await User.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single user by their ID
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

// POST to create one or more new users (e.g., for registration).
app.post("/user", async (req, res) => {
  try {
    console.log("Creating new user(s)"); // Debug log for user creation
    const newObject = req.body.map((item) => new User(item));
    console.log(newObject); // Debug log to see user data before insertion
    const savedProject = await User.insertMany(newObject);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update an existing user by their ID.
app.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedPost = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
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

// DELETE a user by their ID.
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

// -- SERVER ACTIVATION --

// Create the HTTP server with the Express app as the handler.
const server = http.createServer(app);
// Start the server and listen for incoming requests on the specified port.
// The callback function logs a message to the console once the server is running.
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});