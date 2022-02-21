import Message from 'App/Models/Message'
import { v1 as uuidv1 } from 'uuid'

export default class MessagesController {
    public async create({ request, response }) {
        const userId = request.input('userId')
        const roomId = request.input('roomId')
        const text = request.input('text')

        let uuid = uuidv1()
        const message = await Message.create({ id: uuid, roomId: roomId, userId: userId, text: text })
        response.status(200)
        response.send({
            code: 'SUCCESSFULLY_REGISTED_USER_TYPE',
            message: 'Mesanje enviado correctamente',
            data: { message: message }
        })
    }
    public async update({ request, response }) {
        const id = request.params().id
        const messageFields = request.all()

        const message = await Message.find(id)
        await message!.merge(messageFields).save()
        response.status(200)
        response.send({
            code: 'SUCCESSFULLY_REGISTED_USER_TYPE',
            message: 'Mesanje actualizado correctamente',
            data: { message: message }
        })
    }
    public async find({ /*request,*/ response }) {
        // const roomId = request.all().roomId
        const messages = await Message.query()// .where('roomId', roomId).preload('user')
        response.status(200)
        response.send({
            data: { messages: messages }
        })
    }
}
