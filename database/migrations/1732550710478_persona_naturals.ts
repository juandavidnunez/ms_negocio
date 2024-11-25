import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PersonaNaturales extends BaseSchema {
  protected tableName = 'persona_naturales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre').notNullable()
      table.date('fecha_nacimiento').notNullable()
      table.string('cedula').notNullable().unique()
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE')
      table.integer('empresa_id').unsigned().references('id').inTable('empresas').onDelete('CASCADE')
      table.integer('usuario_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
