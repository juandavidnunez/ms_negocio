import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const seguroValidation = {
    schema: schema.create({
        fecha_inicio: schema.date({}, [
            rules.required()
        ]),
        fecha_fin: schema.date({}, [
            rules.required()
        ]),
        estado: schema.boolean([
            rules.required()
        ]),
        vehiculo_id: schema.number([
            rules.required(),
            rules.exists({ table: 'vehiculos', column: 'id' })
        ])
    })
}