import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const operacionValidation = {
    schema: schema.create({
        vehiculo_id: schema.number([
            rules.required(),
            rules.exists({ table: 'vehiculos', column: 'id' })
        ]),
        municipio_id: schema.number([
            rules.required(),
            rules.exists({ table: 'municipios', column: 'id' })
        ])
    })
}