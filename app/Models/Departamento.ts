import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'

export default class Departamento extends BaseModel {
  public static table = 'departamentos'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Municipio, {
   foreignKey: 'departamento_id',
  })
  public Municipioes: HasMany<typeof Municipio>
}
