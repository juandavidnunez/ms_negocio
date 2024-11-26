import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const conductorValidation = {
  schema: schema.create({
    nombre: schema.string({}, [
      rules.required()
    ]),
    fecha_nacimiento: schema.date({
      format: "yyyy-MM-dd",
    }, [
      rules.required()
    ]),
    cedula: schema.string({}, [
      rules.unique({ table: 'conductores', column: 'cedula' }),
      rules.required()
    ]),
    user_id: schema.number([
      rules.exists({ table: 'usuarios', column: 'id' }),
      rules.required()
    ])
  })
}
