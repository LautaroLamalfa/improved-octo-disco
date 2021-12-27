const express = require('express');

const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
    if (req.session.user) {
        res.send({user: req.session.user});
    } else {
        res.send(false);
    }
});

router.post("/", (req, res) => {
    req.session.user = req.body.nombre;
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:8080");
    res.end()
})

module.exports = router;