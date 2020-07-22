const express = require('express')
const routes = express.Router()
const salesman = require('./controllers/salesmanControllers')
const customer = require('./controllers/customersControllers')


//Rotas dos vendedores
routes.get('/', function(req, res){
    return res.redirect('/salesman')
})
routes.post('/salesman', salesman.post)
routes.get('/salesman', salesman.list)
routes.get('/salesman/create', salesman.create)
routes.get('/salesman/:id', salesman.show)
routes.get('/salesman/:id/edit', salesman.edit)
routes.put('/salesman', salesman.put)
routes.delete('/salesman', salesman.delete)

//Rotas dos clientes
routes.get('/', function(req, res){
    return res.redirect('/customer')
})
routes.post('/customer', customer.post)
routes.get('/customer', customer.list)
routes.get('/customer/create', customer.create)
routes.get('/customer/:id', customer.show)
routes.get('/customer/:id/edit', customer.edit)
routes.put('/customer', customer.put)
routes.delete('/customer', customer.delete)


module.exports = routes