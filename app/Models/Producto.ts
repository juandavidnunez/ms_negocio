import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'
import Cliente from './Cliente'
import Categoria from './Categoria'

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public cliente_id: number

  @column()
  public lote_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Lote,{
    foreignKey: 'lote_id'
  })
  public lote: BelongsTo<typeof Lote>

  @belongsTo(() => Cliente,{
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @manyToMany(() => Categoria, {
    pivotTable: 'categorias_productos',
    pivotForeignKey: 'producto_id',
    pivotRelatedForeignKey: 'categoria_id',
    pivotColumns: ['cantidad','created_at', 'updated_at']
  })
  public categorias: ManyToMany<typeof Categoria>
}
