import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operacion from 'App/Models/Operacion';
import { operacionValidation } from 'App/Validators/OperacionValidator';

export default class OperacionesController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(operacionValidation);
        const theOperacion = await Operacion.create(body)
        return theOperacion
    }

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Operacions: Operacion[] = await Operacion.query().paginate(page, perPage)
        return Operacions
    }

    public async show({ params }: HttpContextContract) {
        return Operacion.query().where("id", params.id).preload('vehiculo')
    }

    public async findById({ params }: HttpContextContract) {
        const theOperacion = await Operacion.findOrFail(params.id)
        return theOperacion
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(operacionValidation);
        const theOperacion = await Operacion.findOrFail(params.id)
        return theOperacion.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOperacion = await Operacion.findOrFail(params.id)
        response.status(204)
        return await theOperacion.delete()
    }
}
