import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DirListaOrden from 'App/Models/DirListaOrden';
import { dirListaOrdenValidation } from 'App/Validators/DirListaOrdenValidator';

export default class DirListaOrdenessController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(dirListaOrdenValidation);
        const theDirListaOrden = await DirListaOrden.create(body);
        return theDirListaOrden
      }
    
      public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let DirListaOrdeness: DirListaOrden[] = await DirListaOrden.query().paginate(page, perPage)
        return DirListaOrdeness
      }

      public async show ({params}:HttpContextContract){
        return DirListaOrden.query().where("id",params.id).preload('ruta')
      }
    
      public async findById({ params }: HttpContextContract) {
        const theDirListaOrdenes = await DirListaOrden.findOrFail(params.id)
        return theDirListaOrdenes
      }
    
    //   public async update({ params, request }: HttpContextContract) {
    //     const body = await request.validate(dirlistaordenesValidation);
    //     const theDirListaOrdenes = await DirListaOrdenes.findOrFail(params.id)
    //     //theDirListaOrdenes.categoria = body.categoria
    //     return theDirListaOrdenes.save()
    //   }
    
    public async delete({ params, response }: HttpContextContract) {
        const theDirListaOrdenes = await DirListaOrden.findOrFail(params.id)
        response.status(204)
        return await theDirListaOrdenes.delete()
    }                                                                  
}