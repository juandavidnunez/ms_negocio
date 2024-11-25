import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const duenoValidation = {
  schema: schema.create({
    nombre: schema.string({}, [
      rules.required()
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'duenos', column: 'email' }),
      rules.required()
    ]),
    fecha_nacimiento: schema.date({}, [
      rules.required()
    ]),
    cedula: schema.string({}, [
      rules.unique({ table: 'duenos', column: 'cedula' }),
      rules.required()
    ]),
    user_id: schema.number([
      rules.exists({ table: 'usuarios', column: 'id' }),
      rules.required()
    ])
  })
}
