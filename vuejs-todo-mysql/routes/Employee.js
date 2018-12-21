var express = require("express")
var router = express.Router()
const Employee = require("../model/Employee")

//Get All Emp
router.get("/emp", (req, res) => {
    Employee.findAll()
        .then(emp => {
            res.json(emp)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Add Emp
router.post("/emp", (req, res) => {
    if (!req.body.name) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        Employee.create(req.body)
            .then(() => {
                res.send(" Added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Emp
router.delete("/emp/:id", (req, res) => {
    Employee.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send("Deleted!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Emp
router.put("/emp/:id", (req, res) => {
    if (!req.body.name) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        Employee.update(
            { name: req.body.name, age: req.body.age, comment: req.body.comment },
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.send(" Updated!")
            })
            .error(err => res.send(err))
    }
})

module.exports = router