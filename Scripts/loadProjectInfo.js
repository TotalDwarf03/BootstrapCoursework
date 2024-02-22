fetch("../ProjectPages/pages.json")
    .then(response => response.json())
    .then(json => updateDOM(json));

projectFileName = window.location.pathname.split("/").pop().toLowerCase();

function updateDOM(json){
    for(let i = 0; i < json.Projects.length; i++){
        project = json.Projects[i];

        if (project.pageurl.toLowerCase() == projectFileName){
            
        }
        else {
            
        }
    }
}