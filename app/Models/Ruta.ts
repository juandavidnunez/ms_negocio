import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import Direccion from './Direccion';
import Lote from './Lote';
import Vehiculo from './Vehiculo';
import Contrato from './Contrato';
import DirListaOrden from './DirListaOrden';

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public contratoId: number;

  @column()
  public vehiculoId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Direccion, {
    pivotTable: 'dir_lista_ordenes',
    pivotForeignKey: 'ruta_id',
    pivotRelatedForeignKey: 'direccion_id',
    pivotColumns: ['orden', 'created_at', 'updated_at'],
  })
  public direcciones: ManyToMany<typeof Direccion>;

  @hasMany(() => Lote, {
    foreignKey: 'rutaId',
  })
  public lotes: HasMany<typeof Lote>;

  @belongsTo(() => Vehiculo, {
    foreignKey: 'vehiculoId',
  })
  public vehiculo: BelongsTo<typeof Vehiculo>;

  @belongsTo(() => Contrato, {
    foreignKey: 'contratoId',
  })
  public contrato: BelongsTo<typeof Contrato>;

  @hasMany(() => DirListaOrden, {
    foreignKey: 'rutaId',
  })
  public dirListaOrdenes: HasMany<typeof DirListaOrden>;
}
