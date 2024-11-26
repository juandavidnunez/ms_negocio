import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria';
import { categoriaValidation } from 'App/Validators/CategoriaValidator';

export default class CategoriasController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(categoriaValidation);
    const theCategoria = await Categoria.create(body)
    return theCategoria
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Categorias: Categoria[] = await Categoria.query().paginate(page, perPage)
    return Categorias
  }

  public async show({ params }: HttpContextContract) {
    return Categoria.query().where("id", params.id).preload('productos')
  }

  public async findById({ params }: HttpContextContract) {
    const theCategoria = await Categoria.findOrFail(params.id)
    return theCategoria
  }


  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(categoriaValidation);
    const theCategoria = await Categoria.findOrFail(params.id)
    theCategoria.nombre = body.nombre
    return theCategoria.save()
  }


  public async delete({ params, response }: HttpContextContract) {
    const theCategoria = await Categoria.findOrFail(params.id)
    response.status(204)
    return await theCategoria.delete()
  }
}
