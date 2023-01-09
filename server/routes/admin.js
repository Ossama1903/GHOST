const express = require("express");
const router = express.Router();
const { getAuth } = require("firebase-admin/auth");

router.post("/create-user", (req, res) => {
  const { email, password } = req.body;
  getAuth()
    .createUser({
      email,
      password,
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.send(null);
    });
});

router.post("/delete-user", (req, res) => {
  const { userId } = req.body;
  getAuth()
    .deleteUser(userId)
    .then(() => {
      res.send(true);
    })
    .catch((error) => {
      console.log(error);
      res.send(false);
    });
});

module.exports = router;
