

function add_person_to_video_people(person, img_src){

  const div = document.createElement("div")
  const img = document.createElement("img")
  const p = document.createElement("p")

  div.appendChild(img)
  div.appendChild(p)

  div.classList.add("person")

  img.src = img_src
  p.innerHTML = person

  const people_container = document.getElementById("detected-people-container")
  people_container.appendChild(div)



}


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



  get_people_in_video(title, (people_response)=>{

    for(let person of people_response){
      console.log(person)

    }



  })

  


})