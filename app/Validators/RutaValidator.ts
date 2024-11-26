import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const rutaValidation = {
    schema: schema.create({
        contratoId: schema.number([
            rules.required(),
            rules.exists({ table: 'contratoes', column: 'id' })
        ]),
        vehiculoId: schema.number([
            rules.required(),
            rules.exists({ table: 'vehiculos', column: 'id' })
        ]),

    })
}