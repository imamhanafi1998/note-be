const express = require("express");
const serverless = require("serverless-http");
const app = express();

// custom start
const cors = require('cors')
app.use(cors())
app.use(express.json())
// custom end

const router = express.Router();

// custom start
const mongoose = require('mongoose')
require('../db/mongoose')
const Note = require('../models/note')
// custom end

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

// custom start
router.get("/notes", async (req, res) => {
  const note = await Note.find({}).sort({updatedAt: -1})
  try {
    await res.status(201).send(note)
  } catch (e) {
    res.status(500).send(e)
  }
});

router.get('/notes/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  res.status(201).send(note)
})

router.post('/notes/add', async (req, res) => {
  const note = new Note(req.body);
  try {
    await note.save();
    res.status(201).send("sukses");
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put('/notes/edit/:id', async (req, res) => {
  await Note.findByIdAndUpdate( req.params.id, {...req.body})
  try {
    console.log({...req.body})
    console.log("sukses")
    res.status(201).send("sukses")
  } catch(err) {
    console.log("gagal")
    res.status(500).send(err)
  }

})
router.delete('/notes/delete/:id', async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id)

  try {
    console.log("sukses")
    console.log(req.params.id)
    res.status(200).send()
  } catch (err) {
    console.log("gagal")
    console.log(req.params.id)
    res.status(500).send()
  }
})
// custom end

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);