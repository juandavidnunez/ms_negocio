import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lotes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('cantidad_productos').notNullable()
      table.integer('peso_total').notNullable()
      table.datetime('fecha_creacion').notNullable()
      table.datetime('fecha_entrega').nullable()

      table.integer('dir_lista_orden_id').unsigned().references('dir_lista_ordens.id').onDelete('CASCADE')
      table.integer('ruta_id').unsigned().references('rutas.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
