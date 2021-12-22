const ContenedorFirebase = require ("../../contenedores/contenedorFire")

class firebase extends ContenedorFirebase {

    constructor() {
        super('chat')
    }
}

module.exports = firebase