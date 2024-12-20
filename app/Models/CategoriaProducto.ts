import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'

export default class CategoriaProducto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cantidad: number

  @column()
  public categoria_id: number

  @column()
  public producto_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Categoria,{
    foreignKey: 'categoria_id'
  })
  public categoria: BelongsTo<typeof Categoria>

  @belongsTo(() => Categoria,{
    foreignKey: 'producto_id'
  })
  public producto: BelongsTo<typeof Categoria>
}
