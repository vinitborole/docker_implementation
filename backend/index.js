const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

// Add mysql database connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
});

// init db tables
// dirty approach we must use migrations for this

db.query(
  `CREATE TABLE IF NOT EXISTS todo (
    id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    completed boolean NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;`,
  function (err, result) {
    if (err) console.log("unable to init db tables");
  }
);

// Enable cors security headers
app.use(cors());

// add an express method to parse the POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home page
app.get("/", (req, res) => {
  console.log(db);
  res.send(`Hello World`);
});

// get all of the books in the database
app.get("/get", (req, res) => {
  db.query("SELECT * FROM `todo`", function (err, results) {
    res.send(results);
  });
});

// add a book to the database
app.post("/insert", (req, res) => {
  const title = req.body.title;
  const InsertQuery = "INSERT INTO todo (title) VALUES (?)";
  db.query(InsertQuery, [title], (err, result) => {
    console.log(result);
  });
});

// delete a book from the database
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const DeleteQuery = "DELETE FROM todo WHERE id = ?";
  db.query(DeleteQuery, id, (err, result) => {
    if (err) console.log(err);
  });
});

// update a book review
app.put("/update/:id", (req, res) => {
  const completed = req.body.completed;
  const id = req.params.id;
  const UpdateQuery = "UPDATE todo SET completed = ? WHERE id = ?";
  db.query(UpdateQuery, [completed, id], (err, result) => {
    if (err) console.log(err);
    if (result) res.send({ status: true });
  });
});

app.listen("3001", () => {});
