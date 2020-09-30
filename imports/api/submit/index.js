const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");
var serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tedecoco-forms.firebaseio.com/",
});
const db = admin.database();

router.put("/", (req, res) => {
  const { title, fields } = req.body;
  res.json({ response: "ERES LA VERGA" });
  db.ref(title).push(fields);
});

module.exports = router;
