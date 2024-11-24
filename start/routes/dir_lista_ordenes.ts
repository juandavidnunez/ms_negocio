import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/dirlistaordenes', 'DirListaOrdenesController.findAll')
  Route.get('/dirlistaordenes/:id', 'DirListaOrdenesController.findById')
  Route.post('/dirlistaordenes', 'DirListaOrdenesController.create')
  Route.put('/dirlistaordenes/:id', 'DirListaOrdenesController.update')
  Route.delete('/dirlistaordenes/:id', 'DirListaOrdenesController.delete')
})