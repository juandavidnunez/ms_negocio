import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const contratoValidation = {
  schema: schema.create({
    numero: schema.number([
      rules.required()
    ]),
    valor: schema.number([
      rules.required()
    ]),
    fecha_inicio: schema.date({
      format: "yyyy-MM-dd",
    }, [
      rules.required()
    ]),
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' }),
      rules.required()
    ])
  })
}