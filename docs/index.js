
function create_status(circle_class, text, onclick){

  const status_div = document.getElementById("status-div")

  const status_bar = document.createElement("div")
  status_bar.classList.add("status-bar")

  const circle = document.createElement("div")
  circle.classList.add(circle_class)


  const status_text = document.createElement("p")
  status_text.classList.add("status-text")
  status_text.innerText = text


  status_bar.appendChild(circle)
  status_bar.appendChild(status_text)

  status_bar.addEventListener("click", onclick)

  status_div.appendChild(status_bar)

}




document.addEventListener("DOMContentLoaded", ()=>{

  get_status((data)=>{


    if (data["python"] == 0){
      create_status("red-circle", "AI Camera Offline", console.log)
    }
    else{
      create_status("green-circle", "AI Camera Online", stop_python)

    }
  


  })



})