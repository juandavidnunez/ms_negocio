import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import CentrosDistribucion from './CentrosDistribucion'
import Municipio from './Municipio'
import Ruta from './Ruta'
import DirListaOrden from './DirListaOrden'

export default class Direccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public direccion : string

  @column()
  public municipio_id : number
  @column()
  centros_distribucions_id :number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => CentrosDistribucion, {
    foreignKey: 'centros_distribucions_id',
  })
  public centroDistribucion: BelongsTo<typeof CentrosDistribucion>

  @belongsTo(() => Municipio, {
    foreignKey: 'municipio_id',
  })
  public municipio: BelongsTo<typeof Municipio>

  @manyToMany(() => Ruta, {
    pivotTable: 'dir_lista_ordenes',
    pivotForeignKey: 'direccion_id',
    pivotRelatedForeignKey: 'ruta_id',
    pivotColumns: ['orden', 'created_at', 'updated_at'],
  })
  public rutas: ManyToMany<typeof Ruta>

  @hasMany(() => DirListaOrden,{
    foreignKey: 'direccion_id'
  })
  public dirListaOrdenes: HasMany<typeof DirListaOrden>
}
