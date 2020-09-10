const express = require("express");
const app = express();
const db = require("../db/db.json");
const fs = require("fs");
const {v4:uuid} = require("uuid");

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

    res.json(db)
    
  });

  app.delete("/api/notes/:id", function(req, res){
    //read db.json file
    fs.readFileSync("./db/db.json", db);
    //make a new var and set the noteId = req.params.id
    let noteId2 = req.params.id;
    // start a for loop to filter through the saved notes on db.json

    //    inside for loop, write if condition to match index of saved note with selected note to delete, then write file with omitted data - stays inside for loop
    
    return res.json(db);
  });

};