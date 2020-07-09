const valor = require('../models/valor')
const {age,date} = require('../../lib/utils')



module.exports = {
  index(req,res){
    


    
  },
  membros(req,res){
    
      valor.all(function(valores){
        return res.render('membros',{ membros})
      })
  },
  create(req,res){
    return res.render('create')
  },
  post(req,res){
    const keys   = Object.keys(req.body)
    const foto = 'https://images.unsplash.com/photo-1528709024086-98a7672e0b9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60/500x500'
    
    if(req.body.link_foto == ""){
      req.body.link_foto = foto
    }
  
    for(item of keys){
      if(req.body[item] == ""){
        return res.send('Somente o campo "Link para a foto" pode ficar vazio')
      }
    }
    valor.create(req.body,function(valor) {
      return res.redirect(`membros/${valor.id}`)
    })


  },

  home(req,res){
    return res.render('index')
  },

  show(req,res){
    valor.find(req.params.id,function(valor){
      if(!valor) return res.send("Membro não encontrado")

      valor.idade = age(valor.idade)
      
      valor.desde = date(valor.desde).format

      return res.render("addvalor", { valor })


    })

  },
  edit(req,res){
    
    valor.find(req.params.id,function(valor){
      if(!valor) return res.send("Membro não encontrado")

      valor.idade = date(valor.idade).iso

      return res.render("edit",{ valor })

    })
  },

  put(req,res){
    const keys   = Object.keys(req.body)
    const foto = 'https://images.unsplash.com/photo-1528709024086-98a7672e0b9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60/500x500'
    
    if(req.body.link_foto == ""){
      req.body.link_foto = foto
    }
  
    for(item of keys){
      if(req.body[item] == ""){
        return res.send('Somente o campo "Link para a foto" pode ficar vazio')
      }
    }
    
    valor.update(req.body, function(){
      return res.redirect(`/membros/${req.body.id}`)
    })

  },

  delete(req,res){
    valor.delete(req.body.id, function(){
      return res.redirect('/membros')
    })
  },

  addvalor(req,res){
    

      return res.render("addvalor")

  },
  /*postvalores(req,res){
    valor.addvalor(req.body,function(valor) {
      return res.redirect(`membros/${valor.id}`)
    })

  }*/
}




