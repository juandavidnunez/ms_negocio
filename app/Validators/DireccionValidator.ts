import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const direccionValidation = {
  schema: schema.create({
    direccion: schema.string({}, [
      rules.required(),
      rules.maxLength(15)
    ]),
    municipioId :schema.number([
      rules.required(),
      rules.exists({ table: 'municipios', column: 'id' })
    ]),
    centrosDistribucionId :schema.number([
      rules.required(),
      rules.exists({ table: 'centros_distribucions', column: 'id' })
    ])
  })
}
