const ContenedorMongoDb = require ("../../contenedores/contenedorMongo")

class chatMongoDb extends ContenedorMongoDb {

    constructor() {
        super('chat', {
            chat: { type: [], required: true }
        })
    }

    async guardar(carrito = { chat: [] }) {
        return super.guardar(carrito)
    }
}

module.exports = chatMongoDb