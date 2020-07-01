module.exports = {
  all(callback){
    db.query(`SELECT * FROM membros`,function(err,results){
      if(err) return res.send("Erro na base de dados")

      callback(results.rows)
    })

  },
  create(){

  }
}