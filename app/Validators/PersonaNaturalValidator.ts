import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const PersonaNaturalCreateValidator = {
  schema: schema.create({
    nombre: schema.string({}, [rules.required()]),
    fecha_nacimiento: schema.date({}, [rules.required()]),
    cedula: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'persona_naturales', column: 'cedula' }),
    ]),
    cliente_id: schema.number([
      rules.required(),
      rules.exists({ table: 'clientes', column: 'id' }),
    ]),
    empresa_id: schema.number.optional([
      rules.exists({ table: 'empresas', column: 'id' }),
    ]),
    usuario_id: schema.number([
      rules.required(),
      rules.exists({ table: 'usuarios', column: 'id' }),
    ]),
  })
}

export const PersonaNaturalUpdateValidator = {
  schema: schema.create({
    nombre: schema.string.optional(),
    fecha_nacimiento: schema.date.optional(),
    cedula: schema.string.optional({}, [
      rules.unique({ table: 'persona_naturales', column: 'cedula' }),
    ]),
    cliente_id: schema.number.optional([
      rules.exists({ table: 'clientes', column: 'id' }),
    ]),
    empresa_id: schema.number.optional([
      rules.exists({ table: 'empresas', column: 'id' }),
    ]),
    usuario_id: schema.number.optional([
      rules.exists({ table: 'usuarios', column: 'id' }),
    ]),
  })
}
