import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota';
import { cuotaValidation } from 'App/Validators/CuotaValidator';

export default class CuotasController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(cuotaValidation);
        const theCuota = await Cuota.create(body);
        return theCuota
      }
    
      public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Cuotas: Cuota[] = await Cuota.query().paginate(page, perPage)
        return Cuotas
      }

      public async show ({params}:HttpContextContract){
        return Cuota.query().where("id",params.id).preload('contrato')
      }
    
      public async findById({ params }: HttpContextContract) {
        const theCuota = await Cuota.findOrFail(params.id)
        return theCuota
      }
    
    //   public async update({ params, request }: HttpContextContract) {
    //     const body = await request.validate(cuotaValidation);
    //     const theCuota = await Cuota.findOrFail(params.id)
    //     //theCuota.categoria = body.categoria
    //     return theCuota.save()
    //   }
    
    public async delete({ params, response }: HttpContextContract) {
        const theCuota = await Cuota.findOrFail(params.id)
        response.status(204)
        return await theCuota.delete()
    }
}
