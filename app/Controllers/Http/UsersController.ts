// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async update({ auth, request, response }) {
        const id = request.params().id
        if (typeof id !== 'string') {
            response.status(400)
            response.send({
                code: 'ID_INVALID',
                message: 'ID no valido',
            })
            return
        }
        try {
            await auth.use('api').authenticate()
            let user = auth.use('api').user
            const users = await User.query().where('id', user.id).preload('userType')
            user = users[0]
            if (user!.id === id || user!.userType.name === 'Administrador') {
                const userFields = request.all()
                user = await User.find(id)
                await user.merge(userFields).save()
                response.status(200)
                response.send({
                    code: "USER_UPDATED_SUCCESFULLY",
                    message: 'Usuario actualizado correctamente',
                })
                return
            } else {
                response.status(400)
                response.send({
                    code: "NOT_HAVE_PERMISSION",
                    message: 'No tiene permiso para hacer esta operación',
                })
                return
            }
        } catch (error) {
            response.status(400)
            response.send({
                code: "INVALID_API_TOKEN",
                message: 'Token no valido',
            })
            return
        }
    }
    public async findOne({ request, response }) {
        const id = request.params().id
        if (typeof id !== 'string') {
            response.status(400)
            response.send({
                code: 'ID_INVALID',
                message: 'ID no valido',
            })
            return
        }
        try {
            const users = await User.query().where('id', id).preload('userType')
            const user = users[0]
            response.status(200)
            response.send({
                data: { user: user }
            })
        } catch (error) {
            console.log(error)
            response.status(400)
            response.send({
                code: "INVALID_API_TOKEN",
                message: 'Token no valido',
            })
            return
        }
    }
    public async find({ response }) {
        let users
        users = await User
            .query()

        response.status(200)
        response.send({
            data: { users: users }
        })
    }
    public async me({ auth, response }) {
        try {
            await auth.use('api').authenticate()
            let user = auth.use('api').user!
            user = await User.query().where('id', user.id).preload('userType')
            response.status(200)
            response.send({
                data: { user: user[0] }
            })
        } catch (error) {
            console.log(error)
            response.status(400)
            response.send({
                code: "INVALID_API_TOKEN",
                message: 'Token no valido',
            })
            return
        }
    }
}
