import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const dirListaOrdenValidation = {
  schema: schema.create({
    orden: schema.number([
      rules.required()
    ]),
    rutaId: schema.number([
      rules.exists({ table: 'rutas', column: 'id' }),
      rules.required()
    ]),
    direccionId: schema.number([
      rules.exists({ table: 'direccions', column: 'id' }),
      rules.required()
    ])
  })
}