import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import axios from 'axios'

export default class UsuariosController {
  private async communicateWithSecurityService(endpoint: string, data: object) {
    try {
      const response = await axios.post(`http://localhost:8080/public/security/${endpoint}`, data)
      return response.data
    } catch (error) {
      throw new Error('Error al comunicarse con el servicio de seguridad')
    }
  }

  public async login({ request, response }: HttpContextContract) {
    try {
      const body = request.only(['email', 'password'])

      const adonisResponse = await this.communicateWithSecurityService('login', {
        email: body.email,
        password: body.password,
      })
      response.send(adonisResponse)
    } catch (error) {
      console.error('Error al consumir la API de seguridad:', error)
      response.status(500).send('Error al consumir la API de seguridad')
    }
  }

  public async secondAuth({ request, response }: HttpContextContract) {
    try {
      const body = request.only(['token', 'id'])

      const adonisResponse = await this.communicateWithSecurityService('second-auth', {
        token: body.token,
        id: body.id,
      })
      response.send(adonisResponse)
    } catch (error) {
      console.error('Error al consumir la API de seguridad:', error)
      response.status(500).send('Error al consumir la API de seguridad')
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.only(['security_id'])
    const theUsuario = await Usuario.create(body)
    return theUsuario
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    const usuarios = await Usuario.query().paginate(page, perPage)
    return usuarios
  }

  public async findById({ params }: HttpContextContract) {
    const theUsuario = await Usuario.findOrFail(params.id)
    return theUsuario
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.only(['email', 'password', 'security_id'])
    const theUsuario = await Usuario.findOrFail(params.id)
    if (body.email) theUsuario.email = body.email
    if (body.password) theUsuario.password = body.password
    if (body.security_id) theUsuario.security_id = body.security_id
    return theUsuario.save()
  }

  public async delete({ params }: HttpContextContract) {
    const theUsuario = await Usuario.findOrFail(params.id)
    return theUsuario.delete()
  }
}
