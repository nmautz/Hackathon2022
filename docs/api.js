
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


function wipe_database(callback){
  let url = `${domain}:${port}/wipe_database`;
  fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback(data)
  })
}

function get_camera_settings(callback){
  let url = `${domain}:${port}/get_camera_settings`;
  fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback(data)
  })

}

function set_camera_settings(callback, options){

  let frame_limit = options.frame_limit
  let trailing_frames = options.trailing_frames
  let record_known = options.record_known
  let process_quality = options.process_quality
  let process_interval_frames = options.process_interval_frames

  let url = `${domain}:${port}/set_camera_settings?frame_limit=${frame_limit}&trailing_frames=${trailing_frames}&record_known=${record_known}&process_quality=${process_quality}&process_interval_frames=${process_interval_frames}`;
  fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback(data)
  })
}