import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'

export default class DirListaOrden extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orden: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Lote, {
    foreignKey: 'dir_lista_orden_id'
  })
  public lotes: HasMany<typeof Lote>
}
