import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa';
import { empresaValidation } from 'App/Validators/EmpresaValidator';

export default class EmpresasController {
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(empresaValidation);
    const theEmpresa = await Empresa.create(body)
    return theEmpresa
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Empresas: Empresa[] = await Empresa.query().paginate(page, perPage)
    return Empresas
  }

  public async show({ params }: HttpContextContract) {
    return Empresa.query().where("id", params.id).preload('personaNatural')
  }

  public async findById({ params }: HttpContextContract) {
    const theEmpresa = await Empresa.findOrFail(params.id)
    return theEmpresa
  }

  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(empresaValidation);
    const theEmpresa = await Empresa.findOrFail(params.id)
    theEmpresa.razon_social = body.razon_social
    return theEmpresa.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theEmpresa = await Empresa.findOrFail(params.id)
    response.status(204)
    return await theEmpresa.delete()
  }
}
