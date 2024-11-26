import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contratoes extends BaseSchema {
  protected tableName = 'contratoes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE')
      table.dateTime('fecha_inicio').notNullable()
      table.integer('numero').notNullable()
      table.decimal('valor', 10, 2).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
