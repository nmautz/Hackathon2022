var express = require("express")
var cors = require("cors")
var mysql = require("mysql");
const config = require('./config.json'); 
const { response } = require("express");
const extractFrames = require('ffmpeg-extract-frames')
const fs = require('fs')


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


app.get('/get_videos', (req,res)=>{
  let result = []
  let q = "SELECT file_path FROM Video"
  con.query(q, (err,response, fields)=>{
    for(let path of response){
      result.push(path.file_path)
    }

    res.write(JSON.stringify(result))
    res.end()
  })
})

app.get('/get_video', (req, res) =>{

  let path = "./facial_python/" + req.query.path


  let video = fs.readFileSync(path)

  res.write(video)
  res.end()

  
})


app.get('/get_people', (req,res)=>{


  let result = {}





  let q = "SELECT f_name, confirmed FROM Face"
  con.query(q, (err,response, fields)=>{
    for(let name of response){

      let f1 = fs.readdirSync("./facial_python/faces/" + name.f_name)[0]
      let img_path = "./facial_python/faces/" + name.f_name + "/" + f1

      result[name.f_name] = [JSON.stringify(img_path), name.confirmed]
    }

    res.write(JSON.stringify(result))
    res.end()
  })


})

app.get('/get_person', (req, res)=>{

  let name = req.query.name;
  let fpath = "./faces/" + name

  let file_names = fs.readdirSync("./facial_python/faces/" + name)

  q = 'SELECT v_path FROM VideoPeople WHERE(f_path=?)'

  con.query(q, [fpath], (err, response, fields)=>{
    console.log(1)
    console.log(response)

    result = {

      "images": file_names,
      "videos": response

    }
      
    res.write(JSON.stringify(result))
    res.end()
    

  })




})
