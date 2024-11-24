import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion'
import Lote from './Lote'
import Vehiculo from './Vehiculo'
import Contrato from './Contrato'
import DirListaOrden from './DirListaOrden'

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

  @belongsTo(() => Vehiculo,{
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(() => Contrato, {
    foreignKey: 'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>

  @hasMany(() => DirListaOrden,{
    foreignKey: 'ruta_id'
  })
  public dirListaOrdenes: HasMany<typeof DirListaOrden>
}
