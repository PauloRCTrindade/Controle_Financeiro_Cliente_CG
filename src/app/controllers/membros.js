const membro = require('../models/membro')
const {age,date} = require('../../lib/utils')



module.exports = {
  index(req,res){
    


    
  },
  membros(req,res){
    
      membro.all(function(membros){
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
    membro.create(req.body,function(membro) {
      return res.redirect(`membros/${membro.id}`)
    })


  },

  home(req,res){
    return res.render('index')
  },

  show(req,res){
    membro.find(req.params.id,function(membro){
      if(!membro) return res.send("Membro não encontrado")

      membro.idade = age(membro.idade)
      
      membro.desde = date(membro.desde).format

      return res.render("show", { membro })


    })

  },
  edit(req,res){
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
    return
  },
  delete(req,res){
    return
  },
}




