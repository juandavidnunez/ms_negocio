import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dueno from 'App/Models/Dueno';
import { duenoValidation } from 'App/Validators/DuenoValidator';

export default class DuenosController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(duenoValidation);
    const dueno = await Dueno.create(body)
    return dueno
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let duenos = await Dueno.query().paginate(page, perPage)
    return duenos
  }

  public async findById({ params }: HttpContextContract) {
    const dueno = await Dueno.findOrFail(params.id)
    return dueno
  }

  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(duenoValidation);
    const dueno = await Dueno.findOrFail(params.id)
    dueno.merge(body)
    return dueno.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const dueno = await Dueno.findOrFail(params.id)
    response.status(204)
    return await dueno.delete()
  }

}
