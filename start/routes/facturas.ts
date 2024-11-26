import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/facturas', 'FacturasController.findAll')
  Route.get('/facturas/:id', 'FacturasController.findById')
  Route.post('/facturas', 'FacturasController.create')
  Route.put('/facturas/:id', 'FacturasController.update')
  Route.delete('/facturas/:id', 'FacturasController.delete')
})