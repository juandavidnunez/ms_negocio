import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import PersonaNatural from './PersonaNatural'

export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public razon_social: string

  @column()
  public cliente_id: number

  @hasOne(() => PersonaNatural, {
    foreignKey: 'empresa_id'
  })
  public personaNatural: HasOne<typeof PersonaNatural>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>
}
