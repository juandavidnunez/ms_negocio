import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const CentrosDistribucionValidation = {
  schema: schema.create({
    nombre: schema.string({}, [
      rules.required(),
      rules.maxLength(15)
    ])
  })
}