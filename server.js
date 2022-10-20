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

  try{
    let path = "./facial_python/" + req.query.path


    let video = fs.readFileSync(path)

    res.write(video)
    res.end()
  }
  catch{
    res.end()
  }
  
})


app.get('/get_people', (req,res)=>{


  let result = {}





  let q = "SELECT f_name, confirmed FROM Face"
  con.query(q, (err,response, fields)=>{
    for(let name of response){

      try{
        let f1 = fs.readdirSync("./facial_python/faces/" + name.f_name)[0]
        if (f1 != undefined){
          let img_path = "./facial_python/faces/" + name.f_name + "/" + f1

          result[name.f_name] = [JSON.stringify(img_path), name.confirmed]

        }
      }
      catch(e){
        console.log("Face Database corrupted on " + name.f_name)
      }

    }

    res.write(JSON.stringify(result))
    res.end()
  })


})

app.get('/get_person', (req, res)=>{

  let name = req.query.name;
  let fpath = "./faces/" + name
  let valid = 1
  let file_names = undefined
  try{
    file_names = fs.readdirSync("./facial_python/faces/" + name)
  }
  catch{
    console.log("Face Database corrupted on " + name)
    res.write("ERROR")
    valid = 0
  }

  if(valid){
    q = 'SELECT v_path FROM VideoPeople WHERE(f_path=?)'

    con.query(q, [fpath], (err, response, fields)=>{

      result = {

        "images": file_names,
        "videos": response

      }
        
      res.write(JSON.stringify(result))
      res.end()
      

    })
  }
})

app.get("/get_video", (req, res)=>{

  let file = fs.readFileSync("./test.avi")

  res.write(file)

  res.end()


})


app.get("/get_people_in_video", (req,res)=>{

  let video_title = req.query.title;

  let video_path = "./videos/" + video_title + ".webm";

  //select * from VideoPeople where (v_path = "./videos/0625c1c5-0f59-48a8-b59b-11f4b7cb3041.webm")
  q = "SELECT f_path FROM VideoPeople WHERE(v_path=?)"

  con.query(q, [video_path], (err, response, fields)=>{

    let result = []

    for(let resp of response){
      let f_path = resp.f_path
      
      f_dir = "./facial_python/" + f_path.substring(2, f_path.length) + "/"

      let pics = fs.readdirSync(f_dir)
      let name = resp.f_path.substring(8,f_path.length)

      let obj = {}

      obj[name] = pics[0]

      result.push(obj)
    }

    res.write(JSON.stringify(result));
    res.end()

  })



})

app.get("/get_status", (req,res)=>{


  result = {}
  let str_status = fs.readFileSync("./facial_python/status.json")

  let json_status = JSON.parse(str_status)


  let now = new Date()

  let last_min = json_status["time"]["minute"]
  let last_hour = json_status["time"]["hour"]
  let last_day = json_status["time"]["day"]
  let last_month = json_status["time"]["month"]
  let last_year = json_status["time"]["year"]



  if(now.getFullYear() == last_year && now.getMonth() == last_month-1 && now.getHours() == last_hour && now.getDate() == last_day){

    var min = now.getMinutes()

    if(min+ 1 > last_min && last_min > min-1) {
      result["python"] = true 



    }else{
      result["python"] = false 

    }

  }else{
    result["python"] = false 
  }


  res.write(JSON.stringify( result))
  res.end()







})
