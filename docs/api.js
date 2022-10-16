
var domain = window.location.origin; //http://someurl.com
var tmp = new URL(domain);
tmp.port = '';
domain = tmp.toString();
domain = domain.substring(0, domain.length-1);
let port = 3000

function get_videos(callback){

  let url = `${domain}:${port}/get_videos`;

  window.fetch(url, {
    method: 'GET'
  }).then(data => data.json()).then((data)=>{
    callback(data)
  })


}