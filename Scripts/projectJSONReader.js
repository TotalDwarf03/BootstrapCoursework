// Get pages information from projects JSON file and convert it into usable JSON
var json;

fetch("../ProjectPages/pages.json")
    .then(response => response.json())
    .then(json => updateDOM(json));

function updateDOM(json){
    var allProjects = document.getElementById("allProjects");
    var featuredProjects = document.getElementById("featuredProjects");

    var html = "";
    var project = "";
    
    for(let i = 0; i < json.Projects.length; i++){
        project = json.Projects[i];
        html = `<p>${project.name}, ${project.imgpath}, ${project.desc}, ${project.techstack}, ${project.pageurl}, ${project.featured}</p>`;
        
        // Add to allProjects
        allProjects.innerHTML += html;

        // Add to featuredProjects if featured == true
        if(project.featured == true){
            featuredProjects.innerHTML += html;
        }
}
}