import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import DirListaOrden from './DirListaOrden'
import Ruta from './Ruta'
import Producto from './Producto'

export default class Lote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cantidad_productos: number

  @column()
  public peso_total: number

  @column.dateTime()
  public fecha_creacion: DateTime

  @column.dateTime()
  public fecha_entrega: DateTime

  @column()
  public dir_lista_orden_id: number

  @column()
  public ruta_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => DirListaOrden,{
    foreignKey: 'dir_lista_orden_id'
  })
  public dirListaOrden: BelongsTo<typeof DirListaOrden>

  @belongsTo(() => Ruta,{
    foreignKey: 'ruta_id'
  })
  public ruta: BelongsTo<typeof Ruta>

  @hasMany(() => Producto,{
    foreignKey: 'lote_id'
  })
  public productos: HasMany<typeof Producto>
}
