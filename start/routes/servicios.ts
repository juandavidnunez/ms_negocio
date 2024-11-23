import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/servicios', 'ServiciosController.findAll')
  Route.get('/servicios/:id', 'ServiciosController.show')
  Route.post('/servicios', 'ServiciosController.create')
  Route.put('/servicios/:id', 'ServiciosController.update')
  Route.delete('/servicios/:id', 'ServiciosController.delete')
})
