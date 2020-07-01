const { Pool } = require("pg")

module.exports = new Pool({
  user:'postgres',
  password:"$@$(***Ep",
  host:'localhost',
  porta:'5432',
  database:'controle de dízimos'
})