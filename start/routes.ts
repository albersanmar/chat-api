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

Route.group(() => {
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout')
    Route.get('/confirm', 'AuthController.confirm')
  }).prefix('auth')
  Route.group(() => {
    Route.get('/me', 'UsersController.me')
    Route.put('/:id', 'UsersController.update')
    Route.get('/:id', 'UsersController.findOne')
    Route.get('/', 'UsersController.find')
  }).prefix('users')
  Route.group(() => {
    Route.post('/', 'UserTypesController.create')
    Route.put('/:id', 'UserTypesController.update')
    Route.get('/:id', 'UserTypesController.findOne')
    Route.get('/', 'UserTypesController.find')
  }).prefix('user-types')
  Route.group(() => {
    Route.post('/', 'RoomsController.create')
    Route.get('/:id', 'RoomsController.findOne')
  }).prefix('rooms')
  Route.group(() => {
    Route.get('/', 'UserRoomsController.find')
  }).prefix('user-rooms')
  Route.group(() => {
    Route.post('/', 'MessagesController.create')
    Route.put('/:id', 'MessagesController.update')
    Route.get('/', 'MessagesController.find')
  }).prefix('messages')
}).prefix('api/v1')