import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const loteValidation = {
  schema: schema.create({
    cantidad_productos: schema.number([
        rules.required()
    ]),
    peso_total: schema.number([
        rules.required()
    ]),
    fecha_creacion: schema.date({}, [
        rules.required()
    ]),

    dir_lista_orden_id: schema.number([
        rules.exists({ table: 'dir_lista_ordens', column: 'id' }),
        rules.required()
    ]),
    ruta_id: schema.number([
        rules.exists({ table: 'rutas', column: 'id' }),
        rules.required()
    ])
  })
}