// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

import User from 'App/Models/User'
// import UserType from 'App/Models/UserType'

import { v1 as uuidv1 } from 'uuid'

export default class AuthController {
    public async register({ request, response }) {
        /*const userTypeId = request.input('userTypeId')
        const email = request.input('email')*/
        const name = request.input('name')
        const password = request.input('password')
        /*if (typeof userTypeId !== 'string') {
            response.status(400)
            response.send({
                code: "USER_TYPE_INVALID",
                message: 'Tipo de usuario no valido',
            })
            return
        }*/
        if (typeof password !== 'string') {
            response.status(400)
            response.send({
                code: "PASSWORD_INVALID",
                message: 'Contraseña no valida',
            })
            return
        }
        /*if (!this.ValidateEmail(email)) {
            response.status(400)
            response.send({
                code: "EMAIL_INVALID",
                message: 'Email no valido',
            })
            return
        }*/
        const users = await User
            .query()
            .where('name', name)
        if (users.length > 0) {
            response.status(400)
            response.send({
                code: "EMAIL_EXISTS",
                message: 'El email ya es usuado por otro usuario',
            })
            return
        }
        /*const userType = await UserType.find(userTypeId)
        switch (userType!.name) {
            case 'Cliente': // Cliente*/
        const uuid = uuidv1()
        // const userType = await UserType.find(userTypeId)
        const user = await User.create({
            id: uuid,
            name: name,
            // email: email,
            password: password,
        })
        // await userType?.related('users').save(user)
        response.status(200)
        response.send({
            code: "USER_CREATED_SUCCESSFULLY",
            message: 'Usuario creado correctamenta',
            data: { user: user }
        })
        /*return
    default:
        response.status(400)
        response.send({
            code: "USER_TYPE_INVALID",
            message: 'Tipo de usuario no valido',
        })
        return
}*/
    }
    public async login({ auth, request, response }) {
        const name = request.input('name')
        const password = request.input('password')
        if (typeof password !== 'string') {
            response.status(400)
            response.send({
                code: "PASSWORD_INVALID",
                message: 'Contraseña no valida',
            })
            return
        }
        /*if (!this.ValidateEmail(email)) {
            response.status(400)
            response.send({
                code: "EMAIL_INVALID",
                message: 'Email no valido',
            })
            return
        }*/
        const users = await User
            .query()
            .where('name', name)
        if (users.length === 0) {
            response.status(400)
            response.send({
                code: "INVALID_CREDENTIALS",
                message: 'Credenciales invalidas',
            })
            return
        } else if (users[0].blocked === true) {
            response.status(400)
            response.send({
                code: "USER_BLOCKED",
                message: 'Usuario bloqueado',
            })
            return
        }
        try {
            const token = await auth.use('api').attempt(name, password)
            response.status(200)
            response.json({
                status: 'success',
                code: "USER_LOGGED",
                message: 'Inicio de sesión exitoso',
                data: { token: token.token }
            })
        } catch {
            response.status(400)
            response.send({
                code: "INVALID_CREDENTIALS",
                message: 'Credenciales invalidas',
            })
            return
        }
    }
    public async logout({ auth, response }) {
        await auth.use('api').revoke()
        response.status(200)
        response.send({
            code: 'SESSION_CLOSED_SUCCESSFULLY',
            message: 'Sesión cerrada correctamente',
        })
    }
    public async confirm({ request, response }) {
        const token = request.all().token
        const user = await User.findBy('confirm_token', token)
        if (user !== null) {
            user!.save()
        }
        response.redirect().toPath(Env.get('REDIRECT_URL'))
    }
    /*private ValidateEmail(email: string): Boolean {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return regex.test(email)
    }*/
}
