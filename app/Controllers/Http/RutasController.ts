import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruta from 'App/Models/Ruta';
import { rutaValidation } from 'App/Validators/RutaValidator';

export default class RutasController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(rutaValidation);
        const theRuta = await Ruta.create(body)
        return theRuta
      }
    
      public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Rutas: Ruta[] = await Ruta.query().paginate(page, perPage)
        return Rutas
      }
    
      public async show({ params }: HttpContextContract) {
        return Ruta.query().where("id", params.id).preload('direcciones')
      }
    
      public async findById({ params }: HttpContextContract) {
        const theRuta = await Ruta.findOrFail(params.id)
        return theRuta
      }
    
      public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(rutaValidation);
        const theRuta = await Ruta.findOrFail(params.id)
        return theRuta.save()
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theRuta = await Ruta.findOrFail(params.id)
        response.status(204)
        return await theRuta.delete()
      }
}
