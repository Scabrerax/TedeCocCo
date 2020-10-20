const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");
var serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tedecoco-ff7a7.firebaseio.com/",
});
const db = admin.database();

//let index = 0;

router.put("/", (req, res) => {
  const { name, fields } = req.body;
  res.json({ response: "ERES LA VERGA" });
  //db.ref(`${name}/${index}`).set(fields);
  db.ref(Date.now().toString()).set(fields);
  //index++;
});

module.exports = router;
