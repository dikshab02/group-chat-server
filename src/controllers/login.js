const LoginCollection = require('mongoose').model('LoginCollection');

module.exports = {
    fetchAllUsers: (req,res) => { //api to fetch all list of users
        try {
            LoginCollection
              .find()
              .then((response) => {
                res.json({
                  isError: false,
                  message: '',
                  data: response
                });
              })
              .catch((error) => {
                res.status(500).json({ 
                  isError: true,
                  message: "Failed to load users",
                  data: error });
              });
          } catch (error) {
            res.status(500).json({ 
              isError: true,
              message: "Internal server error",
              data: error });
          }
    },
    deleteUser: (req,res) => { //api to delete user
        try {
            const userId = req.params.id;
            LoginCollection.findByIdAndRemove(userId)
            .then((deletedUser)=>{
                if (!deletedUser) {
                    return res.status(400).json({
                      isError: true,
                      message: "There is no user with this id",
                      data: ''
                    });
                  }
                  return res.status(200).json({
                    isError: false,
                    message: "user deleted successfully..",
                    data: deletedUser,
                  });
            });
          } catch (error) {
            return res.status(400).json({
              isError: true,
              message: "Something went wrong, try again",
              data: error
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
              res.send({
                isError: false,
                message: '',
                data: response
              })
              if (!res) {
                return res.status(400).json({ 
                  isError: true,
                  message: "User not found",
                  data: '' });
              }
            })
            .catch((error) => {
              res.status(500).json({ 
                isError: true,
                message: "Failed to execute query",
                data: error.message });
            });
        } catch (error) {
          res.status(500).json({ 
            isError: true,
            message: "Internal server error",
            data: error.message });
        }
    },
    registration: (req,res) => { //api for registration
        const data = {
            name: req.body.name,
            password: req.body.password,
          };
          LoginCollection.create(data)
          .then(() =>{
            res.send({ 
              isError: false,
              message: "Registered successfully",
              data: '' });
          })
          .catch((error)=>{
            res.status(500).json({ 
              isError: true,
              message: "Failed to register",
              data: error.message
             });
          });
         
    },
    login: (req,res) => {
        try {
            LoginCollection.findOne({ name: req.body.name })
            .then((user) =>{
                if (user.password === req.body.password) {
                    res.send({
                      isError: false,
                      message:'',
                      data: user
                    })
                  } else {           
                    res.send({
                      isError: true,
                      message:'wrong password',
                      data: ''
                    })
                  }
            });
          } catch (error) {
            res.send({
              isError: true,
              message:'wrong details',
              data: error.message
            })
          }
    },
    searchUser: (req,res) => {  //api to search registered user
            try {
              const userName = req.body.name;
              LoginCollection
                .find({ name: { $regex: userName, $options: "i" } }) //partial search
                .then((response) => {
                  res.json({
                    isError: false,
                    message:'',
                    data: response
                  })
                });
            } catch (error) {
              res.status(500).json({ 
                isError: true,
                message: "Internal server error",
                data: error.message });
            }
    }
}
