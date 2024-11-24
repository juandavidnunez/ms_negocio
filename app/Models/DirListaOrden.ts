import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'
import Ruta from './Ruta'
import Direccion from './Direccion'

export default class DirListaOrden extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orden: number

  @column()
  public ruta_id: number

  @column()
  public direccion_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Lote, {
    foreignKey: 'dir_lista_orden_id'
  })
  public lotes: HasMany<typeof Lote>

  @belongsTo(() => Ruta, {
    foreignKey: 'ruta_id'
  })
  public ruta: BelongsTo<typeof Ruta>

  @belongsTo(() => Direccion, {
    foreignKey: 'direccion_id'
  })
  public direccion: BelongsTo<typeof Direccion>
}
