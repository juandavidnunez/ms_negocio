import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Gastos extends BaseSchema {
  protected tableName = 'gastos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('cantidad').unsigned().notNullable()
      table.integer('dueno_id').unsigned().notNullable().references('id').inTable('duenos').onDelete('CASCADE')
      table.integer('conductor_id').unsigned().notNullable().references('id').inTable('conductores').onDelete('CASCADE')
      table.integer('servicio_id').unsigned().notNullable().references('id').inTable('servicios').onDelete('CASCADE')
      table.integer('factura_id').unsigned().nullable().references('id').inTable('facturas').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
