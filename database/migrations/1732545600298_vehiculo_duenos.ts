import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VehiculoDuenos extends BaseSchema {
  protected tableName = 'vehiculo_duenos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos').onDelete('CASCADE')
      table.integer('dueno_id').unsigned().references('id').inTable('duenos').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
