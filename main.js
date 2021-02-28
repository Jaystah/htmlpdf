var fs = require("fs");
var pdf = require("html-pdf");
<<<<<<< HEAD
var html = fs.readFileSync("./test/businesscard.html", "utf8");
var options = { format: "Legal" };
=======
var html = fs.readFileSync("./test/factuur-template.html", "utf8");
var options = { format: "Letter" };
>>>>>>> d296165e3ba2e9172702be4ff944db2bfae52edd
 
// Factuur nummer in naam als parameter
pdf.create(html, options).toFile("./factuur.pdf", function (err, res) {
  if (err) return console.log(err);
  console.log(res);
});