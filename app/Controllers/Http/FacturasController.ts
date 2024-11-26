import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Factura from 'App/Models/Factura';
import FacturaValidator from 'App/Validators/FacturaValidator';
import Env from '@ioc:Adonis/Core/Env';
import axios from 'axios';
import Cuota from 'App/Models/Cuota';

export default class FacturasController {
  public async create({ request, response }: HttpContextContract) {
    try {
      const body = await request.validate(FacturaValidator);
      const pagos_host = Env.get('PAGOS_HOST');

      // Copiar el body sin modificar cuota_id
      const { cuota_id, ...restoDelBody } = body;

      const theCuota = await Cuota.findOrFail(cuota_id);
      if (theCuota.valor !== body.valor) {
        return response.status(400).send({ error: 'El valor de la cuota no es el mismo a pagar' });
      }

      // Solicitud a la API de Pagos
      const adonisResponse = await axios.post(pagos_host, { ...restoDelBody, cuota_id });

      // Crear el objeto factura con los datos necesarios
      const factura = new Factura();
      factura.fecha_pago = adonisResponse.data?.data?.fecha || null;
      factura.valor = adonisResponse.data?.data?.valor || null;
      factura.info = adonisResponse.data || null;
      factura.success = adonisResponse.data?.status || false;
      factura.cuota_id = cuota_id;

      // Guardar la factura
      await factura.save();

      response.status(201).send(factura);
    } catch (error) {
      console.error('Error al consumir la API de Pagos:', error);
      const status = error.response?.status || 500;
      const message = error.response?.data || 'Error al consumir la API de Adonis';
      response.status(status).send(message);
    }
  }

  public async findAll({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1);
      const perPage = request.input('perPage', 20);
      const facturas = await Factura.query().paginate(page, perPage);
      response.status(200).send(facturas);
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
      response.status(500).send('Error al obtener las facturas');
    }
  }

  public async findById({ params, response }: HttpContextContract) {
    try {
      const theFactura = await Factura.findOrFail(params.id);
      response.status(200).send(theFactura);
    } catch (error) {
      console.error('Error al obtener la factura:', error);
      response.status(404).send('Factura no encontrada');
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = await request.validate(FacturaValidator);
      const theFactura = await Factura.findOrFail(params.id);
      Object.assign(theFactura, body);
      await theFactura.save();
      response.status(200).send(theFactura);
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
      const status = error.response?.status || 500;
      const message = error.response?.data || 'Error al actualizar la factura';
      response.status(status).send(message);
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const theFactura = await Factura.findOrFail(params.id);
      await theFactura.delete();
      response.status(204).send;
    } catch (error) {
      console.error('Error al eliminar la factura:', error);
      response.status(500).send('Error al eliminar la factura');
    }
  }
}
