const express = require("express"); //require the express.js
const app = express(); //start the express.js
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, "../templates");
const collection = require("./mongodb");
var cors = require("cors");

app.use(cors());

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res)=> {
//     res.render("login"); //login.hbs
// })

// app.get('/signup', (req,res) => {
//     res.render("signup");
// })

app.get("/getAll", (req, res) => {
  try {
    collection
      .find()
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await collection.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(400).json({
        message: "There is no user with this id",
      });
    }

    return res.status(200).json({
      message: "user deleted successfully..",
      data: deletedUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong, try again",
    });
  }
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  await collection.insertMany([data]);

  res.send({ response: "home" });
});

app.post("/login", async (req, res) => {
  try {
    const user = await collection.findOne({ name: req.body.name });

    if (user.password === req.body.password) {
      res.send(user);
    } else {
      req.send("wrong password");
    }
  } catch {
    res.send("wrong details");
  }
});

app.listen(3000, () => {
  console.log("port connected");
});
