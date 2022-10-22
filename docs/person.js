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
            addRecording(videos[video]['v_path'].substring(9, videos[video]['v_path'].length-5),"../facial_python/thumbnails" +  videos[video]['v_path'].substring(8, videos[video]['v_path'].length-4) + "png",name)

        }




    })
}



addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('name') != null){
        addAllRecordings(urlParams.get('name'))

        try{
            document.getElementById("header_person_name").innerHTML = "Recordings: " + urlParams.get('name')

        }
        catch(e){
            
        }

    }


});

