import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contrato from 'App/Models/Contrato';
import { contratoValidation } from 'App/Validators/ContratoValidator';

export default class ContratosController {

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(contratoValidation);
        const theContrato = await Contrato.create(body);
        return theContrato
      }
    
      public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Contratos: Contrato[] = await Contrato.query().paginate(page, perPage)
        return Contratos
      }

      public async show ({params}:HttpContextContract){
        return Contrato.query().where("id",params.id).preload('cliente')
      }
    
      public async findById({ params }: HttpContextContract) {
        const theContrato = await Contrato.findOrFail(params.id)
        return theContrato
      }
    
    //   public async update({ params, request }: HttpContextContract) {
    //     const body = await request.validate(contratoValidation);
    //     const theContrato = await Contrato.findOrFail(params.id)
    //     //theContrato.categoria = body.categoria
    //     return theContrato.save()
    //   }
    
    public async delete({ params, response }: HttpContextContract) {
        const theContrato = await Contrato.findOrFail(params.id)
        response.status(204)
        return await theContrato.delete()
    }
}
