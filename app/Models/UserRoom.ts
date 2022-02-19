import { DateTime } from 'luxon'
import {
    BaseModel,
    column,
    BelongsTo,
    belongsTo,
} from '@ioc:Adonis/Lucid/Orm'

import Room from 'App/Models/Room'
import User from 'App/Models/User'

export default class UserRoom extends BaseModel {
    @column({ isPrimary: true })
    public id: string

    @column({ serializeAs: 'roomId' })
    public roomId?: string

    @column({ serializeAs: 'userId' })
    public userId?: string

    @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
    public updatedAt: DateTime

    @belongsTo(() => Room)
    public room: BelongsTo<typeof Room>

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>
}
