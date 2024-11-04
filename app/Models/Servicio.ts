import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public descripcion: string

  @column()
  public estado_servicio: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
