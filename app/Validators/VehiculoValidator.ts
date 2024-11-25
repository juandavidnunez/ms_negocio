import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const vehiculoValidation = {
  schema: schema.create({
    placa: schema.string({}, [
      rules.unique({ table: 'vehiculos', column: 'placa' }),
      rules.required()
    ]),
    municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
      rules.required()
    ]),
    tipo_vehiculo: schema.string({}, [
      rules.required()
    ])
  })
}
