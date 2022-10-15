var express = require("express")
var cors = require("cors")

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