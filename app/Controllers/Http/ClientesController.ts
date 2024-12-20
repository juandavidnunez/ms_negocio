import axios from 'axios';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Cliente from 'App/Models/Cliente';
import Env from '@ioc:Adonis/Core/Env';
import Usuario from 'App/Models/Usuario';

class ClientesController {
  private apiUrl: string;

  constructor() {
    // Usa la variable de entorno para la URL del microservicio de seguridad
    this.apiUrl = Env.get('MS_SECURITY');
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const body = request.only(['name', 'email', 'password']);
      const token = request.header('Authorization');

      if (!token) {
        return response.status(401).send('Token de acceso faltante');
      }

      // Crear usuario en el microservicio de seguridad
      const userResponse = await axios.post(
        `${this.apiUrl}/users`,
        {
          name: body.name,
          email: body.email,
          password: body.password,
        },
        {
          headers: {
            'Authorization': token,
          },
        }
      );

      // Obtener el ID del usuario desde la respuesta
      const userId = userResponse.data._id;

      // Verificar que el ID del usuario no sea undefined
      if (!userId) {
        return response.status(500).send('Error al crear el usuario, ID no encontrado');
      }

      // Asignar rol al usuario creado
      const roleResponse = await axios.post(
        `${this.apiUrl}/user_roles/user/${userId}/role/67453fbefc75550ebedaf728`,
        {},
        {
          headers: {
            'Authorization': token,
          },
        }
      );

      // Verificar que la asignación de rol fue exitosa
      if (roleResponse.status !== 200) {
        return response.status(roleResponse.status).send('Error al asignar el rol');
      }

      // Crear un nuevo cliente en tu base de datos con el ID de usuario
     // Crear un nuevo registro en la tabla de usuarios con el ID de usuario devuelto por el sistema de seguridad
     const usuario = new Usuario();
     usuario.security_id = userId; // Guarda el ID del usuario devuelto por el sistema de seguridad
     await usuario.save();
 
     // Obtener el ID autogenerado del registro en la tabla de usuarios
     const usuarioId = usuario.id;
 
     // Crear un nuevo cliente en tu base de datos con el ID de usuario autogenerado
     const cliente = new Cliente();
     cliente.user_id = usuarioId; // Guarda el ID autogenerado en el modelo cliente
     await cliente.save();
 
     // Responder con los datos del cliente creado
     response.status(201).send({
       user: userResponse.data,
       role: roleResponse.data,
       cliente: cliente,
     });
      
    } catch (error) {
      console.error('Error al consumir la API de Adonis:', error);

      // Manejo de errores con detalles
      const status = error.response?.status || 500;
      const message = error.response?.data || 'Error al consumir la API de Adonis';

      response.status(status).send(message);
    }
  }

  // Listar todos los usuarios
  public async findAll({ request, response }: HttpContextContract) {
    try {
      const token = request.header('Authorization');
      if (!token) {
        return response.status(401).send('Token de acceso faltante');
      }

      const adonisResponse = await axios.get(`${this.apiUrl}/users`, {
        headers: {
          'Authorization': token,
        },
      });

      response.status(adonisResponse.status).send(adonisResponse.data);
    } catch (error) {
      console.error('Error al consumir la API de Adonis:', error);
      response.status(error.response?.status || 500).send('Error al consumir la API de Adonis');
    }
  }

  // Obtener un usuario por id
  public async findById({ params, request, response }: HttpContextContract) {
    try {
      const token = request.header('Authorization');
      if (!token) {
        return response.status(401).send('Token de acceso faltante');
      }

      const apiResponse = await axios.get(`${this.apiUrl}/users/${params.id}`, {
        headers: {
          'Authorization': token,
        },
      });

      response.status(200).send(apiResponse.data);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      response.status(error.response?.status || 500).send(error.response?.data || 'Usuario no encontrado');
    }
  }

  // Actualizar un usuario por id
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = request.only(['name', 'email', 'password']);
      const token = request.header('Authorization');
      if (!token) {
        return response.status(401).send('Token de acceso faltante');
      }

      const adonisResponse = await axios.put(
        `${this.apiUrl}/users/${params.id}`,
        {
          name: body.name,
          email: body.email,
          password: body.password,
        },
        {
          headers: {
            'Authorization': token,
          },
        }
      );

      response.status(adonisResponse.status).send(adonisResponse.data);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      response.status(error.response?.status || 500).send(error.response?.data || 'Error al actualizar el usuario');
    }
  }

  // Eliminar un usuario por id
  public async delete({ params, request, response }: HttpContextContract) {
    try {
      const token = request.header('Authorization');
      if (!token) {
        return response.status(401).send('Token de acceso faltante');
      }
  
      // Hacer la solicitud de eliminación
      await axios.delete(`${this.apiUrl}/users/${params.id}`, {
        headers: {
          'Authorization': token,
        },
      });
  
      // Si la solicitud de eliminación tiene éxito, respondemos con un mensaje de éxito
      response.status(200).send('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      response.status(error.response?.status || 500).send(error.response?.data || 'Error al eliminar el usuario');
    }
  }
}

export default ClientesController;
