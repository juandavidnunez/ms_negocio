import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const vehiculoConductorValidation = {
  schema: schema.create({
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }),
      rules.required()
    ]),
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' }),
      rules.required()
    ])
  })
}
