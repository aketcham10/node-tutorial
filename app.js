const express = require('express');
const Song = require('./models/songs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();

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

router.post("/songs/new", async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.send(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.use('/api', router);

app.listen(3000);

