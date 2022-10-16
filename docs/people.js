function addPerson(image,name)
{  
    let div = document.createElement("div")
    div.className = "person-card"

    let input = document.createElement("input")
    input.value = name
    input.addEventListener("keyup", (e) =>{
        console.log("Name Changed")
    });
    input.className = "person-title"

    let img = document.createElement("img")
    img.src = image

    div.appendChild(input)
    div.appendChild(img)

    document.getElementById("people-container").appendChild(div)

}


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
    for (let i = 0; i < 100; ++i)
        addPerson("test_images/kanye.jpg", "Kanye West")
    addRecording("mike","test_images/kanye.jpg")
});
