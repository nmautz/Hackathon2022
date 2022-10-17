


document.addEventListener("DOMContentLoaded", ()=>{

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const title = urlParams.get("vid-title");

  if(title == null){
    console.log("No vid-title found")
  }

  const video = document.getElementById("video");
  const source = document.getElementById("vid-src");

  source.src = "../facial_python/videos/" + title + ".webm"
  video.load()

  


})