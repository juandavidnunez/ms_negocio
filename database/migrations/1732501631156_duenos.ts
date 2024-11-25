import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Duenos extends BaseSchema {
  protected tableName = 'duenos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre').notNullable()
      table.date('fecha_nacimiento').notNullable()
      table.string('cedula').notNullable().unique()
      table.integer('user_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
