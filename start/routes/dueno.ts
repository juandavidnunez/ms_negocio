import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/dueno', 'DuenosController.findAll')
  Route.get('/dueno/:id', 'DuenosController.findById')
  Route.post('/dueno', 'DuenosController.create')
  Route.put('/dueno/:id', 'DuenosController.update')
  Route.delete('/dueno/:id', 'DuenosController.delete')
})
