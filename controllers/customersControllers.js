const customerModel = require('../models/customersModels')

module.exports = {
    list(req, res) {
        customerModel.all(function(customer){
            return res.render('customer/list', {customer})
        })
    },

    create(req,res) {
        customerModel.salesmanSelectOptions(function(options){
            return res.render('customer/create',{salesmanOptions: options})
        })
    },

    post(req,res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == '') {
                return res.send('Por favor preencha todos os campos')
            }
        }

        customerModel.create(req.body, function(customer){
            return res.redirect(`/customer/${customer.id}`)
        })
    },

    show(req,res) {
        customerModel.find(req.params.id, function(customer){
            if(!customer) return res.send('Customer not found!')

            return res.render('customer/show', {customer})
        })
    },

    edit(req, res){
        customerModel.find(req.params.id, function(customer){
            if(!customer) return res.send('Customer not found')

            customerModel.salesmanSelectOptions(function(options){
                return res.render('customer/edit', {customer, salesmanOptions: options})
            })
        })
    },

    put(req,res) {
        const keys = Object.keys(req.body) 

        for(key of keys) {
            if (req.body[key] =='') {
                return res.send('Please, fill all fields')
            }
        }

        customerModel.update(req.body, function(){
            return res.redirect(`customer/${req.body.id}`)
        })
    },

    delete(req, res) {
        customerModel.delete(req.body.id, function(){
            return res.redirect('/customer')
        })
    }
}