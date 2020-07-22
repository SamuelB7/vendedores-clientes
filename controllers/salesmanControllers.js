const salesmanModel = require('../models/salesmanModels')

module.exports = {
    list(req, res) {
        salesmanModel.all(function(salesman){
            return res.render('salesman/list', {salesman})
        })
    },

    create(req,res) {
        return res.render('salesman/create')
    },

    post(req,res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == '') {
                return res.send('Por favor preencha todos os campos')
            }
        }

        salesmanModel.create(req.body, function(salesman){
            return res.redirect(`/salesman/${salesman.id}`)
        })
    },

    show(req,res) {
        salesmanModel.find(req.params.id, function(salesman){
            if(!salesman) return res.send('Salesman not found!')

            return res.render('salesman/show', {salesman})
        })
    },

    edit(req, res){
        salesmanModel.find(req.params.id, function(salesman){
            if(!salesman) return res.send('Salesman not found')

            return res.render('salesman/edit', {salesman})
        })
    },

    put(req,res) {
        const keys = Object.keys(req.body) 

        for(key of keys) {
            if (req.body[key] =='') {
                return res.send('Please, fill all fields')
            }
        }

        salesmanModel.update(req.body, function(){
            return res.redirect(`salesman/${req.body.id}`)
        })
    },

    delete(req, res) {
        salesmanModel.delete(req.body.id, function(){
            return res.redirect('/')
        })
    }
}