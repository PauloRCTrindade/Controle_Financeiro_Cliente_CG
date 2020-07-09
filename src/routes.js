const express = require('express')
const routes  = express.Router()
const membro = require('./app/controllers/membros')
const valor = require('./app/controllers/valores')


routes.get('/',function(req,res){
  return res.redirect('/home')
})

routes.get('/home',membro.home)

routes.get('/create',membro.create)
routes.post('/create',membro.post)

routes.get('/membros',membro.membros)
routes.get('/membros/:id',membro.show)
routes.get('/membros/:id/edit',membro.edit)
routes.put('/membros/:id',membro.put)
routes.delete('/membro',membro.delete)

routes.get('/membros/:id/addvalor',valor.addvalor)
//routes.post('/membros/:id/addvalor',valor.postvalores)












module.exports = routes