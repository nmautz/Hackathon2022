const http = require("http");
const fs = require("fs")
const path = require('path')


const host = 'localhost';
const port = 8000;



const requestListener = function (req, res) {

  let url = req.url

  if(url == '/'){
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.write(fs.readFileSync("./docs/index.html"))
  }else{

    let ext = path.extname(url)
    if(ext == ".css"){
      res.setHeader("Content-Type", "text/css");




    }else if(ext == ".js"){
      res.setHeader("Content-Type", "text/javascript");


    }
    res.writeHead(200);
    res.write(fs.readFileSync("./docs" + url))



  }



  res.end()


};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


