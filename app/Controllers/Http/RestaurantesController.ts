import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurante from 'App/Models/Restaurante';
import { restauranteValidation } from 'App/Validators/RestauranteValidator';

export default class RestaurantesController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(restauranteValidation);
    const theRestaurante = await Restaurante.create(body)
    return theRestaurante
}

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Restaurantes: Restaurante[] = await Restaurante.query().paginate(page, perPage)
    return Restaurantes
  }


  public async findById({ params }: HttpContextContract) {
    const theRestaurante = await Restaurante.findOrFail(params.id)
    return theRestaurante
  }


  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(restauranteValidation);
    const theRestaurante = await Restaurante.findOrFail(params.id)
    theRestaurante.nombre = body.nombre
    theRestaurante.descripcion = body.descripcion
    return theRestaurante.save()
  }


  public async delete({ params, response }: HttpContextContract) {
    const theRestaurante = await Restaurante.findOrFail(params.id)
    response.status(204)
    return await theRestaurante.delete()
  }

}
