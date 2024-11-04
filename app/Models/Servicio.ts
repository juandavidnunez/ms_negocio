import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hotel from './Hotel'

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
  

  @hasMany(() => Hotel, {
    foreignKey: 'servicio_id',
   })
   public hotel: HasMany<typeof Hotel>
}
