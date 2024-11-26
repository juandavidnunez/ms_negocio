import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/direccion', 'DireccionesController.findAll')
  Route.get('/direccion/:id', 'DireccionesController.findById')
  Route.post('/direccion', 'DireccionesController.create')
  Route.put('/direccion/:id', 'DireccionesController.update')
  Route.delete('/direccion/:id', 'DireccionesController.delete')
})
