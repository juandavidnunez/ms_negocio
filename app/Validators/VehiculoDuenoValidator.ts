import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const vehiculoDuenoValidation = {
  schema: schema.create({
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }),
      rules.required()
    ]),
    dueno_id: schema.number([
      rules.exists({ table: 'duenos', column: 'id' }),
      rules.required()
    ])
  })
}
