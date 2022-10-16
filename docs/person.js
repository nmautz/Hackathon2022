function addAllRecordings(name)
{
    console.log(name)
    for (let i = 0; i < 10; ++i)
    {
        addRecording("na","test_images/kanye.jpg")
    }
}




addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    addAllRecordings(urlParams.get('name'))
    document.getElementById("person_title").innerHTML = "Recordings of: " + urlParams.get('name')
});

