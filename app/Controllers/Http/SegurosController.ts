import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seguro from 'App/Models/Seguro';
import { seguroValidation } from 'App/Validators/SeguroValidator';

export default class SegurosController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(seguroValidation);
        const theSeguro = await Seguro.create(body)
        return theSeguro
    }

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Seguros: Seguro[] = await Seguro.query().paginate(page, perPage)
        return Seguros
    }

    public async show({ params }: HttpContextContract) {
        return Seguro.query().where("id", params.id).preload('vehiculo')
    }

    public async findById({ params }: HttpContextContract) {
        const theSeguro = await Seguro.findOrFail(params.id)
        return theSeguro
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(seguroValidation);
        const theSeguro = await Seguro.findOrFail(params.id)
        theSeguro.fecha_inicio = body.fecha_inicio,
        theSeguro.fecha_fin = body.fecha_fin,
        theSeguro.estado = body.estado
        return theSeguro.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSeguro = await Seguro.findOrFail(params.id)
        response.status(204)
        return await theSeguro.delete()
    }
}
