const express = require('express');
const app = express();
const fs = require("fs");
const cors = require('cors')
let ejs = require('ejs');

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.use(cors())
app.get('/makeinvoice', (req, res) => {
   // const { invoice } = req.body;
   console.log('yo')
    var file = fs.createReadStream('./factuur.pdf');
    var stat = fs.statSync('./factuur.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);
})

app.get('/test', (req, res) => {
    let invoice = req.query.json;
    invoice = JSON.parse(invoice);
    console.log(invoice);
    let d = new Date();
    invoice.today = convertDate(d.toISOString().substr(0, 10));
    d.setDate(d.getDate() + parseInt(invoice.payment_term))
    invoice.payment_term = convertDate(d.toISOString().substr(0, 10));

    var html;
    ejs.renderFile('views/test.ejs', {invoice: invoice}, {}, function(err, str){
        html = str;
        console.log("err",err);
    });

    var fs = require("fs");
    var pdf = require("html-pdf");
    var options = { format: "A4" };
    
    pdf.create(html, options).toFile("./factuur.pdf", function (err, res) {
    if (err) return console.log(err);
        console.log(res);
    });
    var file = fs.createReadStream('./factuur.pdf');
    var stat = fs.statSync('./factuur.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);
  });

app.listen(PORT, () => {
    console.log("Listening on port", PORT)
})

function convertDate(dateString){
    var p = dateString.split(/\D/g)
    return [p[2],p[1],p[0] ].join("-")
}