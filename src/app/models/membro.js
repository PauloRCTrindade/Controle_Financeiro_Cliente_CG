const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all(callback){
    db.query(`SELECT * FROM membros`,function(err,results){
      if(err) return res.send("Erro na base de dados")

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
      if(err) return res.send("Erro na base de dados")
  
      callback(results.rows[0])
    })

  },
  find(id,callback) {
    db.query(`SELECT * 
    FROM  membros 
    WHERE id = $1 `, [id],function(err,results){
      if (err) return res.send('ERRO no Banco de Dados')
      callback(results.rows[0])
    })
  }
}