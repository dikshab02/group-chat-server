const express = require("express"); //require the express.js
const app = express(); //start the express.js
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, "../templates");
const {
  userCollection,
  chatGroupCollection,
  chatMessageCollection,
} = require("./mongodb");
var cors = require("cors");

app.use(cors());

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/getAll", (req, res) => {
  try {
    userCollection
      .find()
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userCollection.findByIdAndRemove(userId);

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

  await userCollection.insertMany([data]);

  res.send({ response: "home" });
});

app.post("/login", async (req, res) => {
  try {
    const user = await userCollection.findOne({ name: req.body.name });

    if (user.password === req.body.password) {
      res.send(user);
    } else {
      req.send("wrong password");
    }
  } catch (err) {
    console.log("err = ", err);
    res.send("wrong details");
  }
});

app.post("/search-user", (req, res) => {
  try {
    const userName = req.body.name;
    userCollection
      .find({ name: { $regex: userName, $options: "i" } }) //partial search
      .then((response) => {
        res.json(response);
      });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/create-chat-group", async (req, res) => {
  try {
    const chatGroup = req.body.chatGroup;
    await chatGroupCollection.insertMany([chatGroup]);
    res.send("chatgroup created");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/groups/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const groups = await chatGroupCollection.find({ "users._id": userId });
    res.send(groups);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});

app.delete("/groups/:groupId/users/:userId", async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;
  try {
    const group = await chatGroupCollection.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    const userIndex = group.users.findIndex(
      (user) => user._id.toString() === userId
    );
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found in the group" });
    }
    group.users.splice(userIndex, 1);
    await group.save();

    res.json({ message: "User removed from the group" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/groups/:groupId", async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const group = await chatGroupCollection.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    // if(!group.isAdmin) {
    //     return res.status(403).json({error: 'user is not an admin of the group'});
    // }

    await chatGroupCollection.findByIdAndRemove(groupId);
    res.json({ message: "Group deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/chat", async (req, res) => {
  const data = {
    chatGrpId: req.body.chatGrpId,
    user: req.body.user,
    time: req.body.time,
    message: req.body.message,
  };
  console.log("data",data)
  try {
    chatMessageCollection
      .insertMany([data])
      .then(() => {
        res.send({ message: "Chat message sent successfully" });
      })
      .catch((err) => {
        res.send(err);
        res.status(500).json({ error: "Cannot save" });
      });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/group/:groupId", (req,res) => {
    const groupId = req.params.groupId;
    try {
        chatMessageCollection.find({"chatGrpId": groupId})
        .then((chat) =>{
            res.send(chat);
        })
    }
    catch(err) {
        res.status(500).json({ err: "Internal server error"});
    }
})

app.listen(3000, () => {
  console.log("port connected");
});
