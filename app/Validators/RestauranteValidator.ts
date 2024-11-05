import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const restauranteValidation = {
  schema: schema.create({
    nombre: schema.string({}, [
      rules.required(),
      rules.maxLength(50)
    ]),
    descripcion: schema.string({}, [
      rules.required(),
      rules.maxLength(150)
    ]),
    servicio_id: schema.number([
      rules.required(),
      rules.exists({ table: 'servicios', column: 'id' })
    ])
  })
}
