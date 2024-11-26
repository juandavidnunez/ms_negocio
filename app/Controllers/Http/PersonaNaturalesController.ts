import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonaNatural from 'App/Models/PersonaNatural'
import { PersonaNaturalCreateValidator, PersonaNaturalUpdateValidator } from 'App/Validators/PersonaNaturalValidator'

export default class PersonasNaturalesController {

  // Crear una nueva persona natural
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(PersonaNaturalCreateValidator)
    const personaNatural = await PersonaNatural.create(body)
    return personaNatural
  }

  // Obtener todas las personas naturales
  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    const personasNaturales = await PersonaNatural.query().paginate(page, perPage)
    return personasNaturales
  }

  // Obtener una persona natural por ID
  public async findById({ params }: HttpContextContract) {
    const personaNatural = await PersonaNatural.findOrFail(params.id)
    return personaNatural
  }

  // Actualizar una persona natural por ID
  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(PersonaNaturalUpdateValidator)
    const personaNatural = await PersonaNatural.findOrFail(params.id)
    personaNatural.merge(body)
    return personaNatural.save()
  }

  // Eliminar una persona natural por ID
  public async delete({ params }: HttpContextContract) {
    const personaNatural = await PersonaNatural.findOrFail(params.id)
    return personaNatural.delete()
  }
}
