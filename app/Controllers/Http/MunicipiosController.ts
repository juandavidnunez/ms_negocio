import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio';
import { MunicipioValidation } from 'App/Validators/MunicipioValidator';


export default class MunicipiosController {
  // Create a new City
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(MunicipioValidation);
    const theMunicipio = await Municipio.create(body)
    return theMunicipio
}

  // Get all Citys
  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Municipios: Municipio[] = await Municipio.query().paginate(page, perPage)
    return Municipios
  }

  // Get a City by id

  public async findById({ params }: HttpContextContract) {
    const theMunicipio = await Municipio.findOrFail(params.id)
    return theMunicipio
  }

  // Update a city by id

  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(MunicipioValidation);
    const theMunicipio = await Municipio.findOrFail(params.id)
    theMunicipio.nombre = body.nombre
    return theMunicipio.save()
  }

  // Delete a driver by id

  public async delete({ params, response }: HttpContextContract) {
    const theMunicipio = await Municipio.findOrFail(params.id)
    response.status(204)
    return await theMunicipio.delete()
  }
}
