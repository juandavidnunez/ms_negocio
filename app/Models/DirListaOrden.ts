import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Lote from './Lote';
import Ruta from './Ruta';
import Direccion from './Direccion';

export default class DirListaOrden extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public orden: number;

  @column()
  public rutaId: number;

  @column()
  public direccionId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Lote, {
    foreignKey: 'dirListaOrdenId',
  })
  public lotes: HasMany<typeof Lote>;

  @belongsTo(() => Ruta, {
    foreignKey: 'rutaId',
  })
  public ruta: BelongsTo<typeof Ruta>;

  @belongsTo(() => Direccion, {
    foreignKey: 'direccionId',
  })
  public direccion: BelongsTo<typeof Direccion>;
}
