import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'
import CentrosDistribucion from './CentrosDistribucion'
import Direccion from './Direccion'
import Vehiculo from './Vehiculo'
import Operacion from './Operacion'

export default class Municipio extends BaseModel {
  public static table = 'municipios'
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public departamento_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Departamento, {
    foreignKey: 'departamento_id',
  })
  public departamento: BelongsTo<typeof Departamento>

  @hasMany(() => CentrosDistribucion, {
    foreignKey: 'municipio_id',
  })
  public sedes: HasMany<typeof CentrosDistribucion>

  @hasMany(() => Direccion, {
    foreignKey: 'municipio_id',
  })
  public direcciones: HasMany<typeof Direccion>

  @manyToMany(() => Vehiculo, {
    pivotTable: 'operaciones',
    pivotForeignKey: 'municipio_id',
    pivotRelatedForeignKey: 'vehiculo_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public vehiculos: ManyToMany<typeof Vehiculo>

  @hasMany(() => Operacion, {
    foreignKey: 'municipio_id',
  })
  public operaciones: HasMany<typeof Operacion>
}

