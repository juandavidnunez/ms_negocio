import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Direccion from 'App/Models/Direccion';
import { direccionValidation } from 'App/Validators/DireccionValidator';

export default class DireccionsController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(direccionValidation);
    const theDireccion = await Direccion.create(body)
    return theDireccion
}

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Direccions: Direccion[] = await Direccion.query().paginate(page, perPage)
    return Direccions
  }


  public async findById({ params }: HttpContextContract) {
    const theDireccion = await Direccion.findOrFail(params.id)
    return theDireccion
  }


  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(direccionValidation);
    const theDireccion = await Direccion.findOrFail(params.id)
    theDireccion.direccion = body.direccion

    return theDireccion.save()
  }


  public async delete({ params, response }: HttpContextContract) {
    const theDireccion = await Direccion.findOrFail(params.id)
    response.status(204)
    return await theDireccion.delete()
  }

}