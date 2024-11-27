import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Turnos extends BaseSchema {
  protected tableName = 'turnos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('conductor_id').unsigned().references('id').inTable('conductors').onDelete('CASCADE')
      table.timestamp('hora_inicio', { useTz: true }).notNullable()
      table.timestamp('hora_vencimiento', { useTz: true }).notNullable()
      table.string('dias').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
