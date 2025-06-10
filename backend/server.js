import express from 'express';
import http from 'http';
import ObjectModel from "./models.js";
import connectDB from './connectDB.js';

const app = express();
const port = 3000;


connectDB();

app.use(express.json());


app.get('/posts', async (req, res) => {
  try {
    const posts = await ObjectModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await ObjectModel.findById(id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.post("/posts", async (req, res) => {
  try {
    const newObject = new ObjectModel(req.body);
    const savedProject = await newObject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedPost = await ObjectModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
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


app.delete('/posts/:id', async (req, res) => {

  try {

    const deleted = await ObjectModel.findByIdAndDelete(req.params.id);
    if(deleted) {
      res.status(200).json({ message: "Post deleted", deleted });
    }else {
      res.status(404).json({ error: "Post not found" });
    }
  }catch(error) {
    res.status(400).json({message: error.message})
  }
});



const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})

// exemplos usados no testes
// {
//     "id": 4,
//     "title": "Amanha",
//     "content": "Amanha tem tenis",
//     "author": "Papa"
//  }
//  {
//     "id": 5,
//     "title": "Vida",
//     "content": "A vida é bela",
//     "author": "CR7"
//  }
//  {
//     "id": 6,
//     "title": "Música",
//     "content": "Here, there and Everywhere",
//     "author": "Meu pai"
//  }
// {
//     "id": 1,
//     "title": 'aleluia',
//     "content": 'O fluminense é grande',
//     "author": 'Eu mesmo',
//   }
//   {
//     "id": 2,
//     "title": 'Tenis',
//     "content": 'Tenis é dahora',
//     "author": 'Ele',
//   },
//   {
//     "id": 3,
//     "title": 'Sexta',
//     "content": 'O dia de hoje é sexta',
//     "author": 'Nós',
//   }
