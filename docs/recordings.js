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

    if(document.getElementById("recordings-container").childNodes.length == 1){
        get_videos((data)=>{


            for(d of data){
                addRecording("mike","../facial_python/thumbnails" +  d.substring(8, d.length-3) + "png")
            }
    
            
    
    
        })
    }

   

 
});


