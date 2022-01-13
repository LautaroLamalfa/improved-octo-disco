const express = require("express");
const Contenedor = require("../src/daos/chat/mongodb");
const { normalize, schema} = require("normalizr");

const { Router } = express;
const router = new Router();


let chat = new Contenedor;

//GET TODO EL CHAT
router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await chat.getAll();

      //NORMALIZR
      const schemaAutor = new schema.Entity('author')
      const mySchema = new schema.Array({
        author: schemaAutor
      })

      //Chat Normalizado
      const normalizedChat = normalize(aux[0].arrayChat, mySchema)

      //Chat Denormalizado
      const denormalizeChat = denormalize(normalizedChat.result, mySchema, normalizedChat.entities)

      //Compresion
      const longNormalizado = JSON.stringify(normalizedChat).length
      const longDenormalizado = JSON.stringify(denormalizeChat).length

      const compresion = ((longNormalizado*100) / (longDenormalizado*100).toFixed(2))

      //Respuesta
      res.send({normalizr: normalizedChat, compresion});


    }
    catch(error){
      res.status(300).json("Error en todos los chats")
    }  
  }    
  getTodos();

});

//POST CON CHAT
router.post("/", (req, res) => {

  async function saveChat(){
    try {
      let aux = await chat.getAll();
      aux[0].arrayChat.push(req.body);
      await chat.update(aux[0])
      res.send('chat agregado');      
    } catch (error) {
      res.status(300).json("Error en post Chat");
    }
  }
  saveChat();
});


//EXPORT MODULO ROUTER
module.exports = router;