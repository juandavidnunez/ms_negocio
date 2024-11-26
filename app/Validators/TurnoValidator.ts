import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const turnoValidation = {
  schema: schema.create({
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' }),
      rules.required()
    ]),
    hora_inicio: schema.date({
      format: "yyyy-MM-dd HH:mm:ss",
    }, [
      rules.required()
    ]),
    hora_vencimiento: schema.date({
      format: "yyyy-MM-dd HH:mm:ss",
    }, [
      rules.required()
    ]),
    dias: schema.string({}, [
      rules.required()
    ])
  })
}
