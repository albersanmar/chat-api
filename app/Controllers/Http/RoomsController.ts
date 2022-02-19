// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Room from 'App/Models/Room'
import UserRoom from 'App/Models/UserRoom'

import { v1 as uuidv1 } from 'uuid'

export default class RoomsController {
    public async create({ request, response }) {
        const users = request.input('users')

        let uuid = uuidv1()
        const room = await Room.create({ id: uuid })
        if (users) {
            for (let user of users) {
                uuid = uuidv1()
                await UserRoom.create({ id: uuid, userId: user, roomId: room.id })
            }
        }
        response.status(200)
        response.send({
            code: 'SUCCESSFULLY_REGISTED_USER_TYPE',
            message: 'Sala creada correctamente',
            data: { room: room }
        })
    }

    public async findOne({ request, response }) {
        const id = request.params().id

        const rooms = await Room
            .query()
            .where('id', id)
            .preload('userRooms', (userRoomQuery) => {
                userRoomQuery.preload('user')
            })
            .preload('messages', messagesQuery => {
                messagesQuery.orderBy('createdAt', 'desc')
            })
        const room = rooms[0]

        response.status(200)
        response.send({
            code: 'SUCCESSFULLY_REGISTED_USER_TYPE',
            message: 'Sala creada correctamente',
            data: { room: room }
        })
    }
}
