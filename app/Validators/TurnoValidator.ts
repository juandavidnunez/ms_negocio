import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const turnoValidation = {
  schema: schema.create({
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' }),
      rules.required()
    ]),
    hora_inicio: schema.date({}, [
      rules.required()
    ]),
    hora_vencimiento: schema.date({}, [
      rules.required()
    ]),
    dias: schema.string({}, [
      rules.required()
    ])
  })
}
