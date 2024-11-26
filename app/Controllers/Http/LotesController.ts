import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lote from 'App/Models/Lote';
import { loteValidation } from 'App/Validators/LoteValidator';

export default class LotesController {

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(loteValidation);
        const theLote = await Lote.create(body)
        return theLote
    }

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Lotes: Lote[] = await Lote.query().paginate(page, perPage)
        return Lotes
    }

    public async show({ params }: HttpContextContract) {
        return Lote.query().where("id", params.id).preload('productos')
    }

    public async findById({ params }: HttpContextContract) {
        const theLote = await Lote.findOrFail(params.id)
        return theLote
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(loteValidation);
        const theLote = await Lote.findOrFail(params.id)
        theLote.cantidad_productos = body.cantidad_productos,
        theLote.peso_total = body.peso_total,
        theLote.fecha_creacion = body.fecha_creacion
        return theLote.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theLote = await Lote.findOrFail(params.id)
        response.status(204)
        return await theLote.delete()
    }

}
