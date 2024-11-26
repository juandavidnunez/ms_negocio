import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const empresaValidation = {
  schema: schema.create({
    razon_social: schema.string({}, [
      rules.required()
    ]),
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' }),
      rules.required()
    ])
  })
}