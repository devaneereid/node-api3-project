const express = require('express');

const Users = require('./userDb');
const postDb = require('../posts/postDb'); //check path 

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  Users.insert(req.body)
      .then(message => {
        res.status(210).json(message);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error adding User" });
      });
});

router.post('/:id/posts', (req, res) => {
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
      .then(userDb => {
        res.status(200).json(userDb)
      })
      .catch(() => {
        res.status(500).json({ message: "Error retrieving users" });
      });
});

router.get('/:id', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
      .then(user => {
        if(user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ 
            message: "User not found"
          })
        }
      })
      .catch(error => {
        console.log(error);
          res.status(500).json({ message: "Error retrieving the user" });
      });
});

router.get('/:id/posts', (req, res) => {
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

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The user has been nuked" })
        } else {
          res.status(404).json({ message: "The User could not be found" })
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error deleting the user" });
      });
});

router.put('/:id', (req, res) => {
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
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
