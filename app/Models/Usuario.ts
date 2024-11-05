import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Administrador from './Administrador'

export default class Usuario extends BaseModel {
  
  

  @hasMany(() => Administrador, {
    foreignKey: 'administrador_id',
  })
  public administrador: HasMany<typeof Administrador>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
