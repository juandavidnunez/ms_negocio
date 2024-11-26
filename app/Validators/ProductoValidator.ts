import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const productoValidation = {
    schema: schema.create({
        nombre: schema.string({}, [
            rules.required()
        ]),
        cliente_id: schema.number([
            rules.required(),
            rules.exists({ table: 'clientes', column: 'id' })
        ]),
        lote_id: schema.number([
            rules.required(),
            rules.exists({ table: 'lotes', column: 'id' })
        ])
    })
}