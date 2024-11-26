import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/persona_natural', 'PersonaNaturalesController.findAll')
  Route.get('/persona_natural/:id', 'PersonaNaturalesController.findById')
  Route.post('/persona_natural', 'PersonaNaturalesController.create')
  Route.put('/persona_natural/:id', 'PersonaNaturalesController.update')
  Route.delete('/persona_natural/:id', 'PersonaNaturalesController.delete')
})