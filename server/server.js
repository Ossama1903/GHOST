const { initializeApp, cert } = require("firebase-admin/app");
const serviceAccount = require("./ghost-e4544-firebase-adminsdk-vhkiv-5b985da391.json");
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/admin", require("./routes/admin"));

initializeApp({ credential: cert(serviceAccount) });

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
