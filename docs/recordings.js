function addRecording(video,thumbnail)
{
    let div = document.createElement("div")
    div.className = "recording"
    div.addEventListener("click", (e) =>{
        console.log(video)
    })
 
    let img = document.createElement("img")
    img.src = thumbnail


    div.appendChild(img)

    document.getElementById("recordings-container").appendChild(div)
}


addEventListener('DOMContentLoaded', (event) => {
    for (var i = 0; i < 100; ++i)
        addRecording("mike","test_images/kanye.jpg")
        
   
});


