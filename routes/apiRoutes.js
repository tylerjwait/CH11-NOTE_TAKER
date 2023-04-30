const express = require("express");
const router = express.Router();
const notes = require("../db/db.json");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

router.get("/notes", function (req, res) {
  res.json(notes);
});

router.post("/notes", function (req, res) {
  const newNote = {
    ...req.body,
    id: uuid.v4(),
  };
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notes)
  );
  res.json(newNote);
});

router.delete("/notes/:id", function (req, res) {
  const id = req.params.id;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes)
    );
    res.json(notes);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

module.exports = router;