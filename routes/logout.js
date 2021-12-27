const express = require('express');

const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
    req.session.destroy((err => {
        if (err) console.log("Error al logout");
        res.statusCode = 302;
        res.setHeader("Location", "http://localhost:8080");
        res.end()
    }))
})