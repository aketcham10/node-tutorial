const express = require('express');
const Song = require('./models/songs');
const cors = require('cors');
const bodyparser = require('body-parser');
const jwt = require('jwt-simple');
const User = require('./models/users');

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();
const secret = "supersecret";

router.post('/user', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Please provide username and password" });
    return;
  }
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post('/auth', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Please provide username and password" });
  }
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
      const token = jwt.encode({ username: user.username }, secret);
      res.send({
        token: token,
        username: user.username,
        auth: true
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.get('/status', async (req, res) => {
  if (!req.headers["x-auth"]) {
    res.status(401).json({ message: "Missing X-Auth header" });
  }
  const token = req.headers["x-auth"];
  try {
    const decoded = jwt.decode(token, secret);
    let users = User.find({}, "username status");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Retrieve all Song in the database
router.get("/songs", async (req, res) => {

  try {
    const songs = await Song.find({});
    res.send(songs);
    console.log(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/songs/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.send(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post("/songs/new", async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.send(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.delete("/songs/:id", async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    res.send(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.put("/songs/:id", async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body);
    res.send(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})



app.use('/api', router);

app.listen(3000);

