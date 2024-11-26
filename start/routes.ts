/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/administradores'
import './routes/categorias'
import './routes/categorias_productos'
import './routes/centrosdistribucion'
import './routes/clientes'
import './routes/conductores'
import './routes/contratos'
import './routes/cuotas'
import './routes/departamentos'
import './routes/direccion'
import './routes/dir_lista_ordenes'
import './routes/dueno'
import './routes/empresas'
import './routes/facturas'
import './routes/gastos'
import './routes/hoteles'
import './routes/lotes'
import './routes/municipios'
import './routes/operaciones'
import './routes/personasnaturales'
import './routes/productos'
import './routes/restaurantes'
import './routes/rutas'
import './routes/seguros'
import './routes/servicios'
import './routes/turnos'
import './routes/usuarios'
import './routes/vehiculoConductors'
import './routes/vehiculoDuenos'
import './routes/vehiculos'










