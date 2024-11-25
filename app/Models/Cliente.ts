import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'
import Producto from './Producto'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Contrato, {
    foreignKey: 'cliente_id'
  })
  public contratos: HasMany<typeof Contrato>

  @hasMany(() => Producto, {
    foreignKey: 'cliente_id'
  })
  public productos: HasMany<typeof Producto>
}
