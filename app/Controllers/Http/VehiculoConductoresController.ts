import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehiculoConductor from 'App/Models/VehiculoConductor';
import { vehiculoConductorValidation } from 'App/Validators/VehiculoConductorValidator';

export default class VehiculoConductoresController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(vehiculoConductorValidation);
    const vehiculoConductor = await VehiculoConductor.create(body)
    return vehiculoConductor
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let vehiculoConductores = await VehiculoConductor.query().paginate(page, perPage)
    return vehiculoConductores
  }

  public async findById({ params }: HttpContextContract) {
    const vehiculoConductor = await VehiculoConductor.findOrFail(params.id)
    return vehiculoConductor
  }

  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(vehiculoConductorValidation);
    const vehiculoConductor = await VehiculoConductor.findOrFail(params.id)
    vehiculoConductor.merge(body)
    return vehiculoConductor.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const vehiculoConductor = await VehiculoConductor.findOrFail(params.id)
    response.status(204)
    return await vehiculoConductor.delete()
  }

}
