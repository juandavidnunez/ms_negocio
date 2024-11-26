import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Empresa from './Empresa'
import Usuario from './Usuario'
import Cliente from './Cliente'

export default class PersonaNatural extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public fecha_nacimiento: DateTime

  @column()
  public cedula: string

  @column()
  public cliente_id: number

  @column()
  public empresa_id: number

  @column()
  public usuario_id: number

  @belongsTo(() => Empresa, {
    foreignKey: 'empresa_id'
  })
  public empresa: BelongsTo<typeof Empresa>

  @belongsTo(() => Usuario, {
    foreignKey: 'usuario_id'
  })
  public usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
