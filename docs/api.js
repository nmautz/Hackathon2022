
var domain = window.location.origin; //http://someurl.com
var tmp = new URL(domain);
tmp.port = '';
domain = tmp.toString();
domain = domain.substring(0, domain.length-1);
let port = 3000

function get_videos(callback){

  let url = `${domain}:${port}/get_videos`;

  fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback(data)
  })
}

function get_people(callback){
  let url = `${domain}:${port}/get_people`;

  fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback(data)
  })


}



function get_person(name, callback){

  let url = `${domain}:${port}/get_person?name=` + name;

  fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback(data)
  })

}


function get_people_in_video(v_title, callback){

  let url = `${domain}:${port}/get_people_in_video?title=` + v_title;
  fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback(data)
  })

}

function get_status(callback){

  let url = `${domain}:${port}/get_status`;
  fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback(data)
  })

}

function stop_python(){


  let url = `${domain}:${port}/stop_python`;
  try{
    fetch(url, {
      method: 'GET'
    }).then(data => data.text()).then((data)=>{
      setTimeout(()=>{
        location.reload()
      }, 1000)
      
    })
  }
  catch (e){
    console.log("Fail")
  }




}

function start_python(){


  let url = `${domain}:${port}/start_python`;
  try{
    fetch(url, {
      method: 'GET'
    }).then(data => data.text()).then((data)=>{
      setTimeout(()=>{
        location.reload()
      }, 10000)
      
    })
  }
  catch (e){
    console.log("Fail")
  }




}

function check_node(callback){
  let url = `${domain}:${port}/get_status`;
  fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback("OK")
  }).catch((e)=>{

    callback("FAIL")
  })

}