import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion'

export default class CentrosDistribucion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  @hasMany(() => Direccion, {
    foreignKey: 'departamento_id',
   })
   public Direcciones: HasMany<typeof Direccion>
}
