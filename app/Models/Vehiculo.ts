import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Seguro from './Seguro'
import Contrato from './Contrato'

export default class Vehiculo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public placa: string

  @column()
  public tipo_vehiculo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Municipio, {
    pivotTable: 'operaciones',
    pivotForeignKey: 'vehiculo_id',
    pivotRelatedForeignKey: 'municipio_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public municipios: ManyToMany<typeof Municipio>

  @manyToMany(() => Contrato, {
    pivotTable: 'rutas',
    pivotForeignKey: 'vehiculo_id',
    pivotRelatedForeignKey: 'contrato_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public contratos: ManyToMany<typeof Contrato>

  @hasMany(() => Seguro,{
    foreignKey: 'vehiculo_id',
  })
  public seguros: HasMany<typeof Seguro>
}
