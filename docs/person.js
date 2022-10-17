function addAllRecordings(name)
{
    console.log(name)
    if (name == null){
        return
    }
    console.log(name)

    get_person(name, (data)=>{
        let videos = data['videos']

        for(let video in videos){
            addRecording("mike","../facial_python/thumbnails" +  videos[video]['v_path'].substring(8, videos[video]['v_path'].length-4) + "png")

        }




    })
}



addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('name') != null){
        addAllRecordings(urlParams.get('name'))

        try{
            document.getElementById("person_title").innerHTML = "Recordings of: " + urlParams.get('name')
        }
        catch(e){
            
        }

    }


});

