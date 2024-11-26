import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hotel from './Hotel'
import Restaurante from './Restaurante'
import Gasto from './Gasto'

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

   @hasMany(() => Gasto, {
    foreignKey: 'servicio_id',
   })
   public gasto: HasMany<typeof Gasto>
   
  @hasMany(() => Restaurante, {
    foreignKey: 'servicio_id',
   })
   public restaurante: HasMany<typeof Restaurante>
}
