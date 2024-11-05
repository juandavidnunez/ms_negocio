import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import CentrosDistribucion from './CentrosDistribucion'

export default class Direccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public direccion : string

  @column()
  CentrosDistribucion_id :number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => CentrosDistribucion, {
    foreignKey: 'CentrosDistribucion_id',
  })
  public CentrosDistribucion: BelongsTo<typeof CentrosDistribucion>
}
