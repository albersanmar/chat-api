import { DateTime } from 'luxon'
import {
    BaseModel,
    column,
    hasMany,
    HasMany
} from '@ioc:Adonis/Lucid/Orm'

import UserRoom from 'App/Models/UserRoom'
import Message from 'App/Models/Message'

export default class Room extends BaseModel {
    @column({ isPrimary: true })
    public id: string

    @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
    public updatedAt: DateTime

    @hasMany(() => UserRoom)
    public userRooms: HasMany<typeof UserRoom>

    @hasMany(() => Message)
    public messages: HasMany<typeof Message>
}
