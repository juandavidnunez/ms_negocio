import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const categoriaValidation = {
  schema: schema.create({
    nombre: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'categorias', column: 'nombre' })
    ]),
    descripcion: schema.string([
      rules.required(),
      rules.maxLength(150)
    ]),
    categoria_padre_id: schema.number.optional([
      rules.exists({ table: 'categorias', column: 'id' })
    ])
  })
}