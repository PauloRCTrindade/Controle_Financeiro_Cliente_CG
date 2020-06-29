const fs    = require('fs')
const data  = require('./data.json')
const {age,date} = require('./utils')

exports.membros = function(req,res){

  return res.render('membros',{membros: data.membros})
}
//Create
exports.create = function(req,res){
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

  let {nome, idade, genero,link_foto,} = req.body

  idade = Date.parse(idade)
  const desde = Date.now()
  const id    = Number(data.membros.length + 1)
  const valores = []
  
  data.membros.push({
    id,
    nome,
    idade,
    genero,
    link_foto,
    desde,
    valores
  })
  
  
  fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
    if(err) return res.send('Erro ao gravar os dados')
      return res.redirect('/create')
  })
  
}

exports.post = function(req,res){
  return res.render('create')
}

exports.home = function(req,res){
  return res.render('index')
}

exports.show = function(req,res){
  const {id} = req.params


  const foundMembros = data.membros.find(function(membro){
    return membro.id == id
  })

  if (!foundMembros) return res.send('Membro não encontrado')

  const membro = {
    ...foundMembros,
    idade: age(foundMembros.idade),
    genero:"",
    desde: new Intl.DateTimeFormat("pt-BR").format(foundMembros.desde),
  }

  return res.render('show',{membro})

}

exports.edit = function(req,res){
  const {id} = req.params


  const foundMembros = data.membros.find(function(membros){
    return membros.id == id
  })

  if (!foundMembros) return res.send('Membro não encontrado')

  const membro = {
    ...foundMembros,
    idade: date(foundMembros.idade)
  }



  return res.render("edit",{ membro })
}

exports.put = function(req,res){
  const {id} = req.body
  let index = 0

  const foundMembros = data.membros.find(function(membros,foundIndex){
    if( id == membros.id){
      index = foundIndex
      return true
    }
  })

  if (!foundMembros) return res.send('Membro não encontrado')

  const membro = {
    ...foundMembros,
    ...req.body,
    idade: Date.parse(req.body.idade),
    id: Number(req.body.id)
  }

  data.membros[index] = membro

  fs.writeFile("data.json", JSON.stringify(data,null,2),function(err){
    if (err) return res.send("Dados não foram alterados")

    return res.redirect(`/membros/${id}`)
  })

}

exports.delete = function(req,res){
  const {id} = req.body

  const filtroMembros = data.membros.filter(function(membros){
    return membros.id != id
  })

  data.membros = filtroMembros

  fs.writeFile('data.json',JSON.stringify(data,null,2),function(err){
    if(err) return res.send('O Arquivo não foi deleteado')
    return res.redirect('/membros')
  })
}


