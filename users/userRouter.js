const express = require('express');

const Users = require('./userDb');
const postDb = require('../posts/postDb'); //check path 

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const user = req.body;
  Users.insert(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error adding User" });
      });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const newPost = { ...req.body, user_id: req.params.id };

  postDb.insert(newPost)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "Error adding new post" });
        });
});

router.get('/', (req, res) => {
  console.log("headers", req.headers);
  // do your magic!
  Users.get()
      .then(user => {
        res.status(200).json(user)
      })
      .catch(() => {
        res.status(500).json({ message: "Error retrieving users" });
      });
});

router.get('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
      .then(user => {
        if(user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" })
        }
      })
      .catch(error => {
        console.log(error);
          res.status(500).json({ message: "Error retrieving the user" });
      });
});


router.get('/:id/posts', validateUser, validatePost, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User post not found" })
        }
      })
      .catch(error => {
        console.log(error);
          res.status(500).json({ message: "Error retrieving user post" });
      });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The user has been nuked" })
        } else {
          res.status(404).json({ message: "The user could not be found" })
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error deleting the user" });
      });
});

router.put('/:id', validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "Error finding user" })
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error updating user"})
      }); 
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = id;
          next();
        } else {
          res.status(400).json({ message: "Invalid user id" })
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Error validating user id" })
      });
};

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body.name) {
    res.status(400).json({ message: "Missing user data" })
  } else if (!req.body.name) {
      res.status(400).json({ message: "Missing required name field" })
    } else {
      next();
    }
};

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "Missing post data" })
  } else if(!req.body.text){
      res.status(400).json({ message: "Missing required text field"})
  } else {
      next();
  };
};

module.exports = router;
