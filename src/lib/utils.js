module.exports = {
  age(timestamp){
    const hoje = new Date()
    const idade = new Date(timestamp)

    let age = hoje.getFullYear() - idade.getFullYear()

    const mes = hoje.getMonth() - idade.getMonth()

    if (mes < 0 || mes == 0 && hoje.getDate() <= idade.getDate()){
      age = age -1
    }
    return age
  },

  date(timestamp){
    const data =  new Date(timestamp)
    const ano = data.getUTCFullYear()
    const mes = `0${data.getUTCMonth() + 1}`.slice(-2)
    const dia = `0${data.getUTCDate()}`.slice(-2)

    return {
      dia,
      mes,
      ano,
      iso:`${ano}-${mes}-${dia}`,
      idade: `${dia}/${mes}`}
  }
  
}