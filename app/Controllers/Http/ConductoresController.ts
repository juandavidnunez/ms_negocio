import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';
import { conductorValidation } from 'App/Validators/ConductorValidator';

export default class ConductoresController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(conductorValidation);
    const conductor = await Conductor.create(body)
    return conductor
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let conductores = await Conductor.query().paginate(page, perPage)
    return conductores
  }

  public async findById({ params }: HttpContextContract) {
    const conductor = await Conductor.findOrFail(params.id)
    return conductor
  }

  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(conductorValidation);
    const conductor = await Conductor.findOrFail(params.id)
    conductor.merge(body)
    return conductor.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const conductor = await Conductor.findOrFail(params.id)
    response.status(204)
    return await conductor.delete()
  }

}
