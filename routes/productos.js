const express = require("express");
const faker = require("faker")

const { Router } = express;
const router = new Router();


//GET
router.get("/", (req, res) => {
    //Genero un array vacio, le pusheo 5 productos con faker y lo envio
    let arrayPtos = [];
    
    for (let index = 0; index < 5; index++) {
        arrayPtos.push({
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            imagen: faker.image.image()
        })
    }

    res.send(arrayPtos)
});

//EXPORT MODULO ROUTER
module.exports = router;