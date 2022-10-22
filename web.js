const http = require("http");
const fs = require("fs")
const path = require('path')
const url_tool = require("url")


const host = '10.0.0.211';
const port = 8000;



const requestListener = function (req, res) {


  try{
    let url = req.url
    let url_mod = ""

    if(url == '/'){
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      fs.readFile("./docs/index.html", (err, data)=>{
        if(err){
          res.write("ERROR: " + err)
          res.end()


        }
        res.write(data)

        res.end()
      })
    }else{
  
      
      let ext = path.extname(url_tool.parse(req.url).pathname)
      if(ext == ".css"){
        res.setHeader("Content-Type", "text/css");  
      }else if(ext == ".js"){
        res.setHeader("Content-Type", "text/javascript");
      }else if(ext == ".png"){
        res.setHeader("Content-Type", "image/png");
        url_mod = "/.."
      }else if(ext == ".html"){
        res.setHeader("Content-Type", "text/html");
        
        
      }else if(ext == ".webm"){
        res.setHeader("Content-Type", "video/webm");
        url_mod = "/.."



      }else{
        console.log(ext + " not yet supported..\nFull URL:  " + url)

      }
      res.writeHead(200);

      let file_path = "./docs" + url_mod + url_tool.parse(url).pathname
      fs.readFile(file_path, (err, data)=>{
        if(err){
          res.write("ERROR: " + err)
          res.end()


        }

        res.write(data)
        res.end()

      })

    }
  }
  catch (e){
    res.write("ERROR: " + e)
    res.end()
  }
  


};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


