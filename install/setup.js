const { spawn } = require("child_process");
const os = require("os")


if(os.platform() == "win64"){
  spawn("cmd", ["/C mariadbwin64.msi"])

}else{
  console.log("Database must manually be set up for " + os.platform())
}



