function addPerson(image,name,isKnown)
{  
    let div = document.createElement("div")
    
    div.className = "person-card"

    if (!isKnown)
    {
        let screen = document.createElement("div")
        screen.className = "unknown fa fa-question"
        div.appendChild(screen)
    }
    

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

    get_people((data)=>{

        for(let person in data){
            let name = person
            let isConfirmed = data[person][1]
            let img =  "../" + data[person][0].substring(1, data[person][0].length-1)
            if(!img.includes('undefined')){
                addPerson(img, name, isConfirmed)

            }else{
                console.log(data[person])
            }
        }



    });

});
