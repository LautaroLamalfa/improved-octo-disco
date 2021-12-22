let admin = require('firebase-admin')
const config = require('../configFire')

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});


const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                res.status(300).json(`Error al listar por id: no se encontró`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            res.status(300).json(`Error al listar por id: ${error}`)
        }
    }

    async guardar(nuevoElem) {
        try {
            const guardado = await this.coleccion.add(nuevoElem);
            return { ...nuevoElem, id: guardado.id }
        } catch (error) {
            res.status(300).json(`Error al guardar: ${error}`)
        }
    }

    async actualizar(nuevoElem) {
        try {
            const actualizado = await this.coleccion.doc(nuevoElem.id).set(nuevoElem);
            return actualizado
        } catch (error) {
            res.status(300).json(`Error al actualizar: ${error}`)
        }
    }

    async borrar(id) {
        try {
            const item = await this.coleccion.doc(id).delete();
            return item
        } catch (error) {
            res.status(300).json(`Error al borrar: ${error}`)
        }
    }

    async borrarAll() {
        // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                res.status(300).json('no se borró todo. volver a intentarlo')
            }

        } catch (error) {
            res.status(300).json(`Error al borrar: ${error}`)
        }
    }

    async desconectar() {
    }

}

module.exports = ContenedorFirebase;