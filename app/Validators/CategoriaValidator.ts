import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const categoriaValidation = {
    schema: schema.create({
      nombre: schema.string({}, [
        rules.required(),
        rules.unique({ table: 'categorias', column: 'nombre' })
      ])
    })   
}