import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const cuotaValidation = {
  schema: schema.create({
    numero: schema.number([
      rules.required()
    ]),
    valor: schema.number([
      rules.required()
    ]),
    contrato_id: schema.number([
      rules.exists({ table: 'contratos', column: 'id' }),
      rules.required()
    ])
  })
}