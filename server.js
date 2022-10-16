var express = require("express")
var cors = require("cors")
var mysql = require("mysql");
const config = require('./config.json'); 


var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.pass,
  database: "hack"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to " + config.host + " as " + config.user + " on database \'hack\'");
});

let app = express()


app.use(express.json());
app.use(cors({
  origin: '*'
}))

app.listen(3000)


app.get('/', (req,res)=>{

  res.write("OK")
  res.end()

})