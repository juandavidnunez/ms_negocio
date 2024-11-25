import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehiculoDueno from 'App/Models/VehiculoDueno';
import { vehiculoDuenoValidation } from 'App/Validators/VehiculoDuenoValidator';

export default class VehiculoDuenosController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(vehiculoDuenoValidation);
    const vehiculoDueno = await VehiculoDueno.create(body)
    return vehiculoDueno
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let vehiculoDuenos = await VehiculoDueno.query().paginate(page, perPage)
    return vehiculoDuenos
  }

  public async findById({ params }: HttpContextContract) {
    const vehiculoDueno = await VehiculoDueno.findOrFail(params.id)
    return vehiculoDueno
  }

  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(vehiculoDuenoValidation);
    const vehiculoDueno = await VehiculoDueno.findOrFail(params.id)
    vehiculoDueno.merge(body)
    return vehiculoDueno.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const vehiculoDueno = await VehiculoDueno.findOrFail(params.id)
    response.status(204)
    return await vehiculoDueno.delete()
  }

}
