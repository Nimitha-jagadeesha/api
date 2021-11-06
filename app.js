const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const password = "CZ6fZDIui3au9Fly";
const mongoUrl = `mongodb+srv://Nimitha:${password}@cluster0.hacxe.mongodb.net/<dbname>?retryWrites=true&w=majority`;
require("./foods");
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const Foods = mongoose.model("food");

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("conected to mongo");
});

mongoose.connection.on("error", error => {
  console.log("error", error);
});

app.get("/data", (req, res) => {
  Foods.find({})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log(error.message);
    });
});

app.post("/data", (req, res) => {
  const food = new Foods({
    name: req.body.name,
    pic:req.body.pic,
    calaries: req.body.calaries
  });
  food
    .save()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/delete", (req, res) => {
  Foods.findByIdAndRemove(req.body.id)
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(error => {
      console.log(error.message);
    });
});

app.post("/update", (req, res) => {
  Foods.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    pic: req.body.pic,
    calaries: req.body.calaries
  })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on PORT:` + PORT));
