import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producto from 'App/Models/Producto';
import { productoValidation } from 'App/Validators/ProductoValidator';

export default class ProductosController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(productoValidation);
        const theProducto = await Producto.create(body)
        return theProducto
    }

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Productos: Producto[] = await Producto.query().paginate(page, perPage)
        return Productos
    }

    public async show({ params }: HttpContextContract) {
        return Producto.query().where("id", params.id).preload('categorias')
    }

    public async findById({ params }: HttpContextContract) {
        const theProducto = await Producto.findOrFail(params.id)
        return theProducto
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(productoValidation);
        const theProducto = await Producto.findOrFail(params.id)
        theProducto.nombre = body.nombre
        return theProducto.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProducto = await Producto.findOrFail(params.id)
        response.status(204)
        return await theProducto.delete()
    }
}
