fetch("../ProjectPages/pages.json")
    .then(response => response.json())
    .then(json => updateDOM(json));

projectFileName = window.location.pathname.split("/").pop().toLowerCase();

function updateDOM(json){
    for(let i = 0; i < json.Projects.length; i++){
        project = json.Projects[i];

        if (project.pageurl.toLowerCase() == projectFileName){
            // Get all UI Elements
            heading = document.getElementById("PageHeading");
            image = document.getElementById("ProjectImage");
            description = document.getElementById("ProjectDescription");
            techStack = document.getElementById("ProjectTechStack");

            heading.innerHTML = project.name;
            image.src = project.imgpath;
            description.innerHTML = project.desc;
            techStack.innerHTML = printTechStack(project.techstack);
        }
        else {
            
        }
    }
}