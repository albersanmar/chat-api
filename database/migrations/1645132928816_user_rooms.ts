import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserRooms extends BaseSchema {
  protected tableName = 'user_rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.uuid('room_id').references('id').inTable('rooms').onDelete('CASCADE')
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
