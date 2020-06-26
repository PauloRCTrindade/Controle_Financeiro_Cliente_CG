const express = require('express')
const routes  = express.Router()
const membro = require('./membros')


routes.get('/',function(req,res){
  return res.redirect('/home')
})

routes.get('/membros',membro.post)

routes.get('/home',membro.home)

routes.get('/membros/:id',membro.show)

routes.get('/membros/:id/edit',membro.edit)

routes.get('/index',membro.membros)

routes.post('/membros',membro.create)

routes.get('/membros/:id/addvalor',membro.addvalor)
routes.post('/addvalor',membro.postaddvalor)


routes.put('/membros',membro.put)

routes.delete('/membros',membro.delete)



module.exports = routes