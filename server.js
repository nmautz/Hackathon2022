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


