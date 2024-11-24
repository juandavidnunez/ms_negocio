import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto'
import CategoriaProducto from './CategoriaProducto'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column({columnName: 'categoria_padre_id'})
  public categoria_padre_id: number|null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Categoria, {
    foreignKey: 'categoria_padre_id'
  })
  public subcategorias: HasMany<typeof Categoria>

  @manyToMany(() => Producto, {
    pivotTable: 'categorias_productos',
    pivotForeignKey: 'categoria_id',
    pivotRelatedForeignKey: 'producto_id',
    pivotColumns: ['cantidad','created_at', 'updated_at']
  })
  public productos: ManyToMany<typeof Producto>

  @hasMany(() => CategoriaProducto, {
    foreignKey: 'categoria_id'
  })
  public categoriasProductos: HasMany<typeof CategoriaProducto>  
}
