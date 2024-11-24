import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion'
import Lote from './Lote'

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contrato_id: number

  @column()
  public vehiculo_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Direccion, {
    pivotTable: 'dir_lista_ordenes',
    pivotForeignKey: 'ruta_id',
    pivotRelatedForeignKey: 'direccion_id',
    pivotColumns: ['orden', 'created_at', 'updated_at'],
  })
  public direcciones: ManyToMany<typeof Direccion>

  @hasMany(() => Lote,{
    foreignKey: 'ruta_id'
  })
  public lotes: HasMany<typeof Lote>
}
