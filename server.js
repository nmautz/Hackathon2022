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

app.get('/get_vThumbnail', (req,res)=>{

  if(req.query.path == null){
    res.write("NO PATH")
    res.end()
    return
  }

  let path = req.query.path

  path = "facial_python/" + path

  extractFrames({
    input: path,
    output: './tmp.jpg',
    offsets: [
      0
    ]
  }).then((path_str) => {
    fs.readFile(path_str, function(err, data) {
      if (err) throw err; // Fail if the file can't be read.
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data); // Send the file data to the browser.
    });
  })




})