// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserRoom from "App/Models/UserRoom"

export default class UserRoomsController {
    public async find({ request, response }) {
        const userId = request.all().userId
        const promise = UserRoom.query()
        let userRooms
        if (userId)
            userRooms = await promise
                .where('userId', userId)
                .preload('user')
                .preload('room', (roomQuery) => {
                    roomQuery
                        .preload('userRooms', (userRoomQuery) => {
                            userRoomQuery.preload('user')
                        })
                        .preload('messages', messagesQuery => {
                            messagesQuery.orderBy('createdAt', 'desc')
                        })
                })
        else
            userRooms = await promise.preload('user').preload('room')

        response.status(200)
        response.send({
            data: { userRooms: userRooms }
        })
    }
}
