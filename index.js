const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const low = require("lowdb");
const FileASync = require("lowdb/adapters/FileAsync");

const adapter = new FileASync("./db/todos.json");

app.use(express.json()); // to support JSON-encoded bodies
app.use(cors());
low(adapter)
  .then(db => {
    /**
     * Get all todos containing token
     */

    app.get("/:token", (req, res) => {
      const todos = db
        .get("todos")
        .filter({ token: req.params.token, isDeleted: false })
        .value();
      return res.status(200).json({ todos });
    });
    /**
     * Get all deleted todos
     */
    app.get("/:token/del", (req, res) => {
      const todos = db
        .get("todos")
        .filter({ token: req.params.token, isDeleted: true })
        .value();
      return res.status(200).json({ todos });
    });
    /**
     * Get all done todos
     */
    app.get("/:token/done", (req, res) => {
      const todos = db
        .get("todos")
        .filter({ token: req.params.token, isDone: true })
        .value();
      return res.status(200).json({ todos });
    });
    /**
     * Add todo
     */
    app.post("/add", (req, res) => {
      const id = {
        id: db
          .get("todos")
          .size()
          .value()
      };
      db.get("todos")
        .push(Object.assign(req.body, id))
        .last()
        .write()
        .then(() => res.status(201).json({ success: true }));
    });
    /**
     * Delete todo based on id
     */
    app.put("/del/", (req, res) => {
      db.get("todos")
        .find({ id: req.body.id, token: req.body.token })
        .assign({ isDeleted: req.body.value })
        .write()
        .then(() => res.status(201).json({ success: true }));
    });
    /**
     * Mark todo as done
     */
    app.put("/done/", (req, res) => {
      db.get("todos")
        .find({ id: req.body.id, token: req.body.token })
        .assign({ isDone: req.body.value })
        .write()
        .then(() => res.status(201).json({ success: true }));
    });
    return db.defaults({ todos: [] }).write();
  })
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  });
