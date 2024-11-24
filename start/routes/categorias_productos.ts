import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/categoriasproductos', 'CategoriasProductosController.findAll')
  Route.get('/categoriasproductos/:id', 'CategoriasProductosController.findById')
  Route.post('/categoriasproductos', 'CategoriasProductosController.create')
  Route.put('/categoriasproductos/:id', 'CategoriasProductosController.update')
  Route.delete('/categoriasproductos/:id', 'CategoriasProductosController.delete')
})