const {age,date} = require('../../lib/utils')
const db = require('../../config/db')
const membro = require('../models/membro')



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
    const query = `
      INSERT INTO membros(
        nome,
        link_foto,
        genero,
        idade,
        desde
      )VALUES ($1, $2, $3, $4, $5)
      RETURNING id
      
    `
    const values = [
      req.body.nome,
      req.body.link_foto,
      req.body.genero,
      date(req.body.idade).iso,
      date(Date.now()).iso
    ]

    db.query(query,values,function(err,results){
      if(err) return res.send("Erro na base de dados")
  
      return res.redirect(`membros/${results.rows[0].id}`)
    })


  },

  home(req,res){
    return res.render('index')
  },

  show(req,res){
    return res.render('index')
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




