const express = require('express')
const routes  = express.Router()
const membro = require('./app/controllers/membros')


routes.get('/',function(req,res){
  return res.redirect('/home')
})

routes.get('/create',membro.create)
//routes.put('/create',membro.put)
routes.post('/create',membro.post)
routes.delete('/create',membro.delete)

routes.get('/membros/:id',membro.show)
routes.get('/membros/:id/edit',membro.edit)

routes.get('/membros',membro.membros)
routes.get('/home',membro.home)









module.exports = routes