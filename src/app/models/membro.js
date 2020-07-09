const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all(callback){
    db.query(`SELECT * FROM membros`,function(err,results){
      if (err) throw `ERRO no Banco de Dados ${err}`

      callback(results.rows)
    })

  },
  create(data,callback){
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
      data.nome,
      data.link_foto,
      data.genero,
      date(data.idade).iso,
      date(Date.now()).iso
    ]

    db.query(query,values,function(err,results){
      if (err) throw `ERRO no Banco de Dados ${err}`
  
      callback(results.rows[0])
    })

  },
  find(id,callback) {
    db.query(`SELECT * 
      FROM  membros 
      WHERE id = $1 `, [id],function(err,results){
        if(err) return "ERRO"//throw `${err}`

         callback(results.rows[0])
    })
  },

  update(data,callback){
    const query = `UPDATE membros SET
    link_foto=($1),
    nome=($2),
    genero=($3),
    idade=($4)
    WHERE id = $5
    `
    const values = [
      data.link_foto,
      data.nome,
      data.genero,
      date(data.idade).iso,
      data.id
    ]

    db.query(query,values,function(err,results){
      if (err) throw `ERRO no Banco de Dados ${err}`
        callback()

    })
  },
  delete(id,callback){
    db.query(`DELETE FROM membros WHERE id = $1`,[id], function(err,results){
      if (err) throw `ERRO no Banco de Dados ${err}`

      return callback()
    })
  },
  
  
}
