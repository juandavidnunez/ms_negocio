import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehiculo from 'App/Models/Vehiculo';
import { vehiculoValidation } from 'App/Validators/VehiculoValidator';

export default class VehiculosController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(vehiculoValidation);
    const vehiculo = await Vehiculo.create(body)
    return vehiculo
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let vehiculos = await Vehiculo.query().paginate(page, perPage)
    return vehiculos
  }

  public async findById({ params }: HttpContextContract) {
    const vehiculo = await Vehiculo.findOrFail(params.id)
    return vehiculo
  }

  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(vehiculoValidation);
    const vehiculo = await Vehiculo.findOrFail(params.id)
    vehiculo.merge(body)
    return vehiculo.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const vehiculo = await Vehiculo.findOrFail(params.id)
    response.status(204)
    return await vehiculo.delete()
  }

}
