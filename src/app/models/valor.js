const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
  all(callback){
    db.query(`SELECT * FROM valores`,function(err,results){
      if (err) throw `ERRO no Banco de Dados ${err}`

      callback(results.rows)
    })

  },
  /*addvalor(data,callback){
    const query = `
      INSERT INTO valores(
        nome,
        valores,
        data_lancamento
      )VALUES ($1, $2, $3)
      RETURNING id
      
    `
    const values = [
      data.nome,
      data.valores,
      date(Date.now()).iso
    ]

    db.query(query,values,function(err,results){
      if (err) throw `ERRO no Banco de Dados ${err}`
  
      callback(results.rows[0])
    })

  },*/
  find(id,callback) {
    db.query(`SELECT * 
      FROM  valores 
      WHERE id = $1 `, [id],function(err,results){
        if(err) return "ERRO"//throw `${err}`

         callback(results.rows[0])
    })
  },
  delete(id,callback){
    db.query(`DELETE FROM valores WHERE id = $1`,[id], function(err,results){
      if (err) throw `ERRO no Banco de Dados ${err}`

      return callback()
    })
  },
  
}
