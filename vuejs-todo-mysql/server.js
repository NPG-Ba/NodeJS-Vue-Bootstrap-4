var express = require("express")
var bodyParser = require("body-parser")

var Employee = require("./routes/Employee")
var cors = require("cors")

var port = 3000

var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api", Employee)

app.listen(port, function () {
    console.log('Server started on port ' + port)
})