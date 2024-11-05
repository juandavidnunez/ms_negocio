import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const servicioValidation = {
  schema: schema.create({
    descripcion: schema.string.optional({}, [
      rules.maxLength(250),
      rules.required()
    ]),
    estado_servicio: schema.boolean([
      rules.required()
    ])
  })
}
