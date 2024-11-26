import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GastoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cantidad: schema.number([
      rules.required(),
      rules.unsigned()
    ]),
    dueno_id: schema.number([
      rules.required(),
      rules.exists({ table: 'duenos', column: 'id' })
    ]),
    conductor_id: schema.number([
      rules.required(),
      rules.exists({ table: 'conductores', column: 'id' })
    ]),
    servicio_id: schema.number([
      rules.required(),
      rules.exists({ table: 'servicios', column: 'id' })
    ]),
    factura_id: schema.number.optional([
      rules.exists({ table: 'facturas', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'cantidad.required': 'La cantidad es obligatoria y debe ser un número.',
    'cantidad.unsigned': 'La cantidad debe ser un número positivo.',
    'dueno_id.required': 'El ID del dueño es obligatorio.',
    'dueno_id.exists': 'El ID del dueño debe existir en la tabla de dueños.',
    'conductor_id.required': 'El ID del conductor es obligatorio.',
    'conductor_id.exists': 'El ID del conductor debe existir en la tabla de conductores.',
    'servicio_id.required': 'El ID del servicio es obligatorio.',
    'servicio_id.exists': 'El ID del servicio debe existir en la tabla de servicios.',
    'factura_id.exists': 'El ID de la factura debe existir en la tabla de facturas.'
  }
}
