const moongose = require('mongoose')
const User = require('../models/user.js')
const response = require('../response.js')
const { ObjectId }  = require('mongodb')

const dbUri = 'mongodb+srv://testuser:crudpasswordtest@cluster0-16idh.mongodb.net/users'

moongose.Promise = global.Promise
moongose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((error) => {
    console.log('[controllers -> user] Error connecting to Mongo Atlas ', error)
})

const controller = {
    create: (req, res) => {
        const { firstName, lastName, email, telephone } = req.body

        if(!firstName || !lastName || !email) {
            response.fail({
                response: res,
                info: 'Nombre, apellido y teléfono son campos obligatorios'
            })
            return
        }

        const newUser = new User({ firstName, lastName, email, telephone })

        newUser.save((error) => {
            if(error) {
                console.log('[controllers -> user] Error saving user ', error)
                response.fail({
                    response: res,
                    info: 'No se pudo crear el usuario'
                })
                return
            }
            response.success({response: res, body: 'Usuario creado'})
        })
    },
    get: (req, res) => {
        User.find(req.query , (error, results) => {
            if(error) {
                console.log('[controllers -> user] Error getting users ', error)
                response.fail({
                    response: res,
                    info: 'No se pudieron obtener los usuarios'
                })
                return
            }

            response.success({response: res, body: results})
        })
    },
    update: (req, res) => {
        const { id } = req.body

        if(!id) {
            response.fail({
                response: res,
                info: 'Se requiere el Id del usuario a modificar'
            })
            return
        }

        try {
            User.updateOne({ _id: ObjectId(id) }, {...req.body, updatedOn: new Date}).then((result) => {
                if(result.nModified) {
                    response.success({response: res, body: 'Usuario actualizado'})
                }
                else {
                    response.fail({
                        response: res,
                        info: 'No se encontró ningún usuario con el Id especificado'
                    })
                }
            })
        }
        catch(error) {
            console.log(`[controllers -> user] Error updating user with id ${id}: `, error)
            response.fail({ response: res })
        }
    },
    delete: (req, res) => {
        const { id } = req.body

        if(!id) {
            response.fail({
                response: res,
                info: 'Se requiere el Id del usuario a eliminar'
            })
            return
        }

        try {
            User.deleteOne({ _id: ObjectId(id) }).then((result) => {
                if(result.deletedCount) {
                    response.success({response: res, body: 'Usuario eliminado'})
                }
                else {
                    response.fail({
                        response: res,
                        info: 'No se encontró ningún usuario con el Id especificado'
                    })
                }
            })
        }
        catch(error) {
            console.log(`[controllers -> user] Error deleting user with id ${id}: `, error)
            response.fail({ response: res })
        }
    },
}

module.exports = controller
