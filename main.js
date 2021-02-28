var fs = require("fs");
var pdf = require("html-pdf");
var html = fs.readFileSync("./test/factuur-template.html", "utf8");
var options = { format: "Letter" };
 
// Factuur nummer in naam als parameter
pdf.create(html, options).toFile("./factuur.pdf", function (err, res) {
  if (err) return console.log(err);
  console.log(res);
});