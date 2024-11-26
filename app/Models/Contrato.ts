import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Cuota from './Cuota'
import Cliente from './Cliente'
import Ruta from './Ruta'

export default class Contrato extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero: number

  @column()
  public valor: number

  @column.dateTime()
  public fecha_inicio: DateTime

  @column()
  public cliente_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Vehiculo, {
    pivotTable: 'rutas',
    pivotForeignKey: 'contrato_id',
    pivotRelatedForeignKey: 'vehiculo_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public vehiculos: ManyToMany<typeof Vehiculo>

  @hasMany(() => Cuota,{
    foreignKey: 'contrato_id'
  })
  public cuotas: HasMany<typeof Cuota>

  @belongsTo(() => Cliente,{
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @hasMany(() => Ruta, {
    foreignKey: 'contrato_id',
  })
  public rutas: HasMany<typeof Ruta>
}
