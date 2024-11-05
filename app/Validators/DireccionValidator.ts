import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const direccionValidation = {
  schema: schema.create({
    direccion: schema.string({}, [
      rules.required(),
      rules.maxLength(15)
    ]),
    CentrosDistribucion_id :schema.number([
      rules.required(),
      rules.exists({ table: 'centrosDistribucions', column: 'id' })
    ])
  })
}
