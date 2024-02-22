// Get pages information from projects JSON file and convert it into usable JSON
var json;

fetch("../ProjectPages/pages.json")
    .then(response => response.json())
    .then(json => updateDOM(json));

function printTechStack(techstack){
    techstackHTML = ""

    for(let i = 0; i < techstack.length; i++){
        techstackHTML += `<li class="list-inline-item ">${techstack[i]}</li>`;
    }

    return techstackHTML;
}

function updateDOM(json){
    var allProjects = document.getElementById("allProjects");
    var featuredProjects = document.getElementById("featuredProjects");

    var html = "";
    var project = "";
    
    for(let i = 0; i < json.Projects.length; i++){
        project = json.Projects[i];

        // For now, using a project example page
        // If deployed, swap link to use project.pageurl
        html = `
            <div class="col mb-4">
                <div class="card h-100 text-center">
                    <img src="../ProjectPages/${project.imgpath}" class="card-img-top " alt="${project.name} Image">
                    <div class="card-body card-body-scroll">
                        <h5 class="card-title">${project.name}</h5>
                        <p class="card-text">${project.desc}</p>
                        <h6>Tech Stack:</h6>
                        <ul class="list-inline list-inline-separator">
                            ${printTechStack(project.techstack)}
                        </ul>
                    </div>
                    <div class="card-footer">
                        <a class="btn btn-primary" href="ProjectPages/exampleProject.html" role="button">Read More</a>
                    </div>
                </div>
            </div>    
        `;
        
        // Add to allProjects
        // .replace to remove a class only for featured projects
        allProjects.innerHTML += html.replace("card-body-scroll", "");

        // Add to featuredProjects if featured == true
        if(project.featured == true){

            // .replace to remove a class only for allProjects grid (removes bottom margin)
            featuredProjects.innerHTML += html.replace("mb-4");
        }
    }
}