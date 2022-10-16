function addPerson(image,name)
{  
    let div = document.createElement("div")
    div.className = "person-card"
    div.id = "kanye"
    

    let input = document.createElement("input")
    input.value = name
    input.addEventListener("keyup", (e) =>{
        console.log("Name Changed")
    });
    input.className = "person-title"

    let img = document.createElement("img")
    img.src = image
    img.addEventListener('click', (e) => {
        location.href = "person.html" + "?name=" + name
    });

    div.appendChild(input)
    div.appendChild(img)

    document.getElementById("people-container").appendChild(div)

}



addEventListener('DOMContentLoaded', (event) => {
    for (let i = 0; i < 100; ++i)
        addPerson("test_images/kanye.jpg", "Kanye West")
});
