import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const clienteValidation = {
  schema: schema.create({
    usuario_id: schema.number([
      rules.required(),
      rules.exists({ table: 'usuarios', column: 'id' }) // Asegúrate de ajustar la tabla y columna según corresponda
    ])
  })}

