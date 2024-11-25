import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno';
import { turnoValidation } from 'App/Validators/TurnoValidator';

export default class TurnosController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(turnoValidation);
    const turno = await Turno.create(body)
    return turno
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let turnos = await Turno.query().paginate(page, perPage)
    return turnos
  }

  public async findById({ params }: HttpContextContract) {
    const turno = await Turno.findOrFail(params.id)
    return turno
  }

  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(turnoValidation);
    const turno = await Turno.findOrFail(params.id)
    turno.merge(body)
    return turno.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const turno = await Turno.findOrFail(params.id)
    response.status(204)
    return await turno.delete()
  }
}
