import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import VehiculoConductor from './VehiculoConductor'
import Turno from './Turno'
import Usuario from './Usuario'
import Vehiculo from './Vehiculo'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public fecha_nacimiento: DateTime

  @column()
  public cedula: string

  @column()
  public user_id: number 

  @belongsTo(() => Usuario, {
    foreignKey: 'user_id'
  })
  public usuario: BelongsTo<typeof Usuario>

  @hasMany(() => VehiculoConductor, {
    foreignKey: 'conductor_id'
  })
  public vehiculoConductor: HasMany<typeof VehiculoConductor>

  @hasMany(() => Turno, {
    foreignKey: 'conductor_id'
  })
  public turno: HasMany<typeof Turno>

  @manyToMany(() => Vehiculo, {
    pivotTable: 'vehiculo_conductors',
    pivotForeignKey: 'conductor_id',
    pivotRelatedForeignKey: 'vehiculo_id'
  })
  public vehiculos: ManyToMany<typeof Vehiculo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
