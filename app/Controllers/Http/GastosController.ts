import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gasto from 'App/Models/Gasto'
import GastoValidator from 'App/Validators/GastoValidator'

export default class GastosController {
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar el cuerpo de la solicitud
      const body = await request.validate(GastoValidator)

      // Crear un nuevo gasto en la base de datos
      const gasto = new Gasto()
      gasto.cantidad = body.cantidad
      gasto.dueno_id = body.dueno_id
      gasto.conductor_id = body.conductor_id
      gasto.servicio_id = body.servicio_id
      if (body.factura_id) {
        gasto.factura_id = body.factura_id
      }
      await gasto.save()

      // Responder con los datos del gasto creado
      response.status(201).send(gasto)
    } catch (error) {
      console.error('Error al crear el gasto:', error)
      response.status(error.response?.status || 500).send(error.message || 'Error al crear el gasto')
    }
  }

  public async findAll({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const perPage = request.input('perPage', 20)
      const gastos = await Gasto.query().paginate(page, perPage)
      response.status(200).send(gastos)
    } catch (error) {
      console.error('Error al obtener los gastos:', error)
      response.status(500).send('Error al obtener los gastos')
    }
  }

  public async findById({ params, response }: HttpContextContract) {
    try {
      const gasto = await Gasto.findOrFail(params.id)
      response.status(200).send(gasto)
    } catch (error) {
      console.error('Error al obtener el gasto:', error)
      response.status(404).send('Gasto no encontrado')
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = await request.validate(GastoValidator)
      const gasto = await Gasto.findOrFail(params.id)
      gasto.merge(body)
      await gasto.save()
      response.status(200).send(gasto)
    } catch (error) {
      console.error('Error al actualizar el gasto:', error)
      response.status(error.response?.status || 500).send(error.message || 'Error al actualizar el gasto')
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const gasto = await Gasto.findOrFail(params.id)
      await gasto.delete()
      response.status(204).send
    } catch (error) {
      console.error('Error al eliminar el gasto:', error)
      response.status(500).send('Error al eliminar el gasto')
    }
  }
}
