const express = require('express')
const routes  = express.Router()
const membro = require('./membros')


routes.get('/',function(req,res){
  return res.redirect('/membros')
})

routes.get('/membros',membro.post)

routes.get('/membros/index',membro.index)

routes.get('/membros/:id',membro.show)

routes.get('/membros/:id/edit',membro.edit)

routes.post('/membros',membro.create)

routes.put('/membros',membro.put)

routes.delete('/membros',membro.delete)



module.exports = routes