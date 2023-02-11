const express = require("express")
const cors = require("cors");
var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./test/businesscard.html', 'utf8');
var options = { format: 'Letter' };

const app = express();
var bodyParser = require("body-parser");

app.use(cors());

const port = process.env.PORT || 3000;
app.use(express.static("website"));

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

const apiData = require("./data.json");

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/service", (req, res) => {
    res.send(apiData);
});

app.post("/ana", (req, res) => {
    console.log(req.body.fore);
    pdf.create(html, options).toFile('./business.pdf', function (err, response) {
        if (response){
            console.log(response);
            res.send(response);
        }
    });
});




app.listen(port, () => {
    console.log("iam live");
});