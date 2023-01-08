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

module.exports = router;
