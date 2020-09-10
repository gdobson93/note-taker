const express = require("express");
const app = express();
const db = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {

    fs.readFileSync("./db/db.json", db);
    res.json(db);

  });

  app.post("/api/notes", function(req, res) {
  
    fs.readFileSync("./db/db.json", db);
   
    let addNote = req.body;
    
    addNote.id = uuidv4();
    
    db.push(addNote);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, 1), function(err) {
      if (err) throw err;
    });

    res.json(addNote);
    
  });

  app.delete("/api/notes/:id", function(req, res){
  
    fs.readFileSync("./db/db.json", db);
    
    let noteId = req.params.id;
   
    for (let i = 0; i < db.length; i++) {
      let newNote = db[i]
      if(noteId.indexof(newNote.id) !== -1) {
        db.splice(i, 1);
        i--;

        fs.writeFileSync("./db/db.json", JSON.stringify(db, null, 1), "utf-8");
      }
    }
    return res.json(db);
  });
};