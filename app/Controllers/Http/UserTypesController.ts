// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserType from 'App/Models/UserType'
import User from 'App/Models/User'

import { v1 as uuidv1 } from 'uuid'

export default class UserTypesController {
    public async create({ request, response }) {
        const name = request.input('name')
        if (typeof name !== 'string') {
            response.status(400)
            response.send({
                code: 'NAME_INVALID',
                message: 'Nombre no valido',
            })
            return
        }
        const uuid = uuidv1()
        const userType = await UserType.create({ id: uuid, name: name })
        response.status(200)
        response.send({
            code: 'SUCCESSFULLY_REGISTED_USER_TYPE',
            message: 'Tipo de usuario creado exitosamente',
            data: { userType: userType }
        })
    }
    public async findOne({ auth, request, response }) {
        try {
            await auth.use('api').authenticate()
            let user = auth.use('api').user!
            const users = await User.query().where('id', user.id).preload('userType')
            user = users[0]
            if (user!.userType.name !== 'Administrador') {
                response.status(400)
                response.send({
                    code: "NOT_HAVE_PERMISSION",
                    message: 'No tiene permiso para hacer esta operación',
                })
                return
            }
        } catch {
            response.status(400)
            response.send({
                code: "INVALID_API_TOKEN",
                message: 'Token no valido',
            })
            return
        }
        const id = request.params().id
        if (typeof id !== 'string') {
            response.status(400)
            response.send({
                code: 'ID_INVALID',
                message: 'ID no valido',
            })
            return
        }
        const userType = await UserType.find(id)
        if (userType === null) {
            response.status(400)
            response.send({
                code: 'USER_TYPE_NOT_EXIST',
                message: 'El tipo de usuario no existe',
            })
            return
        }
        response.status(200)
        response.send({
            data: { userType: userType }
        })
    }
    public async find({ request, response }) {
        const name = request.all().name
        let userTypes
        if (typeof name === 'string') {
            userTypes = await UserType
                .query()
                .where('name', name)
        } else {
            userTypes = await UserType.query()
        }
        response.status(200)
        response.send({
            data: { userTypes: userTypes }
        })
    }
}
