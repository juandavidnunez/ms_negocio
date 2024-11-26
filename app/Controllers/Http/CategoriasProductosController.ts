import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoriaProducto from 'App/Models/CategoriaProducto';
import { categoriaProductoValidation } from 'App/Validators/CategoriaProductoValidator';

export default class CategoriaProductosProductosController {

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(categoriaProductoValidation);
        const theCategoriaProducto = await CategoriaProducto.create(body);
        return theCategoriaProducto
      }
    
      public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let CategoriaProductos: CategoriaProducto[] = await CategoriaProducto.query().paginate(page, perPage)
        return CategoriaProductos
      }

      public async show ({params}:HttpContextContract){
        return CategoriaProducto.query().where("id",params.id).preload('producto')
      }
    
      public async findById({ params }: HttpContextContract) {
        const theCategoriaProducto = await CategoriaProducto.findOrFail(params.id)
        return theCategoriaProducto
      }
    
    //   public async update({ params, request }: HttpContextContract) {
    //     const body = await request.validate(categoriaProductoValidation);
    //     const theCategoriaProducto = await CategoriaProducto.findOrFail(params.id)
    //     //theCategoriaProducto.categoria = body.categoria
    //     return theCategoriaProducto.save()
    //   }
    
    public async delete({ params, response }: HttpContextContract) {
        const theCategoriaProducto = await CategoriaProducto.findOrFail(params.id)
        response.status(204)
        return await theCategoriaProducto.delete()
    }
}
