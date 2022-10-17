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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('name') == null){
        get_videos((data)=>{


            for(d of data){
                addRecording("mike","../facial_python/thumbnails" +  d.substring(8, d.length-4) + "png")
            }
    
            
    
    
        })
    }

   

 
});


