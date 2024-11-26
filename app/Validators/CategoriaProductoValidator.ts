import { schema, rules } from '@ioc:Adonis/Core/Validator';

export const categoriaProductoValidation = {
  schema: schema.create({
    cantidad: schema.number([
      rules.required(),
    ]),
    categoria_id: schema.number([
      rules.required(),
    ]),
    producto_id: schema.number([
      rules.required(),
    ]),
  }),
  messages: {
    'categoria_id.required': 'El campo categoria_id es obligatorio.',
    'producto_id.required': 'El campo producto_id es obligatorio.',
    'unique': 'La combinación de categoria_id y producto_id ya existe.',
  },
  uniqueCombinationRule: rules.unique({
    table: 'categorias_productos',
    column: 'categoria_id',
    where: { producto_id: '{{ producto_id }}' },
  }),
};
