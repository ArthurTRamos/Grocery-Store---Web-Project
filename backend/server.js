import express from "express";
import http from "http";
import cors from "cors";

// Importar modelos
import Coupon from "./Models/Coupon.js";
import Product from "./Models/Product.js";
import User from "./Models/User.js";

// Importar função de conexão com o banco de dados
import connectDB from "./connectDB.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173", // Substitua pela URL do seu front-end
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());

// Coupon Routes
app.get("/coupon", async (req, res) => {
  try {
    const posts = await Coupon.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

app.post("/coupon", async (req, res) => {
  try {
    const newObject = req.body.map((item) => new Coupon(item));
    const savedProject = await Coupon.insertMany(newObject);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/coupon/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedPost = await Coupon.findByIdAndUpdate(id, updatedData, {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Product Routes
app.get("/product", async (req, res) => {
  try {
    const posts = await Product.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

app.post("/product", async (req, res) => {
  try {
    const newObject = req.body.map((item) => new Product(item));
    const savedProject = await Product.insertMany(newObject);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// User Routes
app.get("/user", async (req, res) => {
  try {
    const posts = await User.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

app.post("/user", async (req, res) => {
  try {
    const newObject = req.body.map((item) => new User(item));
    const savedProject = await User.insertMany(newObject);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
