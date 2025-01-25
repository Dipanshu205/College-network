const express = require("express")
const router = express.Router()
const isloggedin = require("../middlewares/isLoggedIn");
const fileModel = require("../models/file-model");
const userModel = require("../models/user-model");
const fs = require('fs');

router.get("/", function (req, res) {
  let error = req.flash("error");
  let success = req.flash("success")
  res.render("index", { error, success, loggedin: false });
});






router.get("/home", isloggedin, async function (req, res) {
  res.render("home",)//{files , success});
})


router.get("/library", isloggedin, async function (req, res) {
  let success = req.flash("success")
  try {
    let pdfFiles = await fileModel.find()
    if (!pdfFiles) {
        return res.status(404).send('PDF document not found');
      }
      res.render("library",{pdfFiles,success})

    }catch (err) {
  console.error('Error retrieving PDF:', err.message);
  res.status(500).send('Internal Server Error');
}
});


router.get('/library/:id', async (req, res) => {
  try {
      const file = await fileModel.findById(req.params.id);
      if (!file || !file.pdf) {
          return res.status(404).send('File not found');
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${file.name || 'document'}.pdf"`);
      res.send(file.pdf); // Send the PDF content
  } catch (err) {
      console.error(err);
      res.status(500).send('Error serving the PDF');
  }
});











router.get("/logout", isloggedin, function (req, res) {
  res.render("index");
})

module.exports = router;