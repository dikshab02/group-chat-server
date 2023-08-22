const LoginCollection = require('mongoose').model('LoginCollection');

module.exports = {
    fetchAllUsers: (req,res) => { //api to fetch all list of users
        try {
            LoginCollection
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
    },
    deleteUser: (req,res) => { //api to delete user
        try {
            const userId = req.params.id;
            LoginCollection.findByIdAndRemove(userId)
            .then((deletedUser)=>{
                if (!deletedUser) {
                    return res.status(400).json({
                      message: "There is no user with this id",
                    });
                  }
                  return res.status(200).json({
                    message: "user deleted successfully..",
                    data: deletedUser,
                  });
            });
          } catch (err) {
            return res.status(400).json({
              message: "Something went wrong, try again",
            });
          }
    },
    updateUsername: (req,res) => { //update username
        const userId = req.params.userId;
        const newName = req.body.newName;
        try {
            LoginCollection
            .findByIdAndUpdate(userId, { name: newName })
            .then((response) => {
              res.send(response);
              if (!res) {
                return res.status(400).json({ error: "User not found" });
              }
            })
            .catch((err) => {
              res.status(500).json({ err: "Failed to execute query" });
            });
        } catch (err) {
          res.status(500).json({ err: "Internal server error" });
        }
    },
    registration: (req,res) => { //api for registration
      console.log('body = ', req.body)
        const data = {
            name: req.body.name,
            password: req.body.password,
          };
          LoginCollection.create(data)
          .then(() =>{
            res.send({ response: "home" });
          })
          .catch((error)=>{
            console.log('Error = ', error)
            res.status(500).json({ error: "Failed to register" });
          });
         
    },
    login: (req,res) => {
        try {
            LoginCollection.findOne({ name: req.body.name })
            .then((user) =>{
                if (user.password === req.body.password) {
                    res.send(user);
                  } else {
                    req.send("wrong password");
                  }
            });
          } catch (err) {
            res.send("wrong details");
          }
    },
    searchUser: (req,res) => {  //api to search registered user
            try {
              const userName = req.body.name;
              LoginCollection
                .find({ name: { $regex: userName, $options: "i" } }) //partial search
                .then((response) => {
                  res.json(response);
                });
            } catch (err) {
              res.status(500).json({ error: "Internal server error" });
            }
    }
}
