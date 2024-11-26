import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FacturaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha_pago: schema.date({
      format: 'sql'
    }, [
      rules.required()
    ]),
    valor: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    info: schema.string({}, [
      rules.required()
    ]),
    success: schema.boolean([
      rules.required()
    ]),
    cuota_id: schema.number([
      rules.required(),
      rules.exists({ table: 'cuotas', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'fecha_pago.required': 'La fecha de pago es obligatoria y debe estar en formato SQL.',
    'fecha_pago.date': 'La fecha de pago debe ser una fecha válida.',
    'valor.required': 'El valor de la factura es obligatorio.',
    'valor.number': 'El valor de la factura debe ser un número.',
    'valor.unsigned': 'El valor de la factura debe ser un número positivo.',
    'info.required': 'La información de ePayco es obligatoria.',
    'success.required': 'El campo de éxito es obligatorio y debe ser un valor booleano.',
    'success.boolean': 'El campo de éxito debe ser un valor booleano.',
    'cuota_id.required': 'El ID de la cuota es obligatorio.',
    'cuota_id.number': 'El ID de la cuota debe ser un número.',
    'cuota_id.exists': 'El ID de la cuota debe existir en la tabla de cuotas.'
  }
}
