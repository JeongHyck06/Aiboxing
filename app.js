const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let db;
const url =
  "mongodb+srv://admin:im5967im@aiboxingonline.ftd5xzt.mongodb.net/?retryWrites=true&w=majority";

new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("users");
    app.listen(8080, () => {
      console.log("http://localhost:8080 에서 서버 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/game", function (req, res) {
  res.sendFile(__dirname + "/views/gameInterface.html");
});

app.get("/list", async (req, res) => {
  let result = await db.collection("post").find().toArray();

  res.render("list.ejs", { users: result });
});

app.post("/resultGame", async (req, res) => {
  await db.collection("post").insertOne({
    name: req.body.name,
    studentId: req.body.studentId,
    score: req.body.score,
  });
  res.redirect("/list");
});
