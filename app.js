const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");
//res.render(view, locals);

MongoClient.connect(
  "mongodb+srv://yash:1234@cluster0.least.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to database");
    const db = client.db("movies");
    const moviescollection = db.collection("movie");

    app.post("/movies", (req, res) => {
      moviescollection
        .insertOne(req.body)
        .then((result) => {
          console.log(req.body);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.get("/", (req, res) => {
      db.collection("movie")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch((error) => console.error(error));
    });
  }
);

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// app.post("/movies", (req, res) => {
//   console.log(req.body);
// });
