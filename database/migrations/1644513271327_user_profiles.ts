import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserProfile extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('user_type_id').references('id').inTable('user_types').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
