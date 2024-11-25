import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Administrador from './Administrador'
import Dueno from './Dueno'
import Conductor from './Conductor'
import PersonaNatural from './PersonaNatural'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public security_id: string

  @hasMany(() => Administrador, {
    foreignKey: 'user_id',
  })
  public administrador: HasMany<typeof Administrador>

  @hasOne(() => Dueno, {
    foreignKey: 'user_id',
  })
  public dueno: HasOne<typeof Dueno>

  @hasOne(() => Conductor, {
    foreignKey: 'user_id',
  })
  public conductor: HasOne<typeof Conductor>

  @hasOne(() => PersonaNatural, {
    foreignKey: 'user_id',
  })
  public persona_natural: HasOne<typeof PersonaNatural>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  email: any
  password: any
}
