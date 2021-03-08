const express = require('express');
const app = express();
const fs = require("fs");
const cors = require('cors')

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

app.listen(PORT, () => {
    console.log("Listening on port", PORT)
})
