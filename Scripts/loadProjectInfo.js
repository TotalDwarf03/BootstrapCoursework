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

            // Change Page Title
            document.title = `TotalDwarf.dev - ${project.name}`;

            // Github Section
            githubBtn = document.getElementById("githubBtn");
            githubStatus = document.getElementById("githubStatus");

            apiUrl = `https://api.github.com/repos/TotalDwarf03/${project.githubname}`;
            // apiUrl = `https://api.github.com/repos/TotalDwarf03/MinefieldGame`;


            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        if(response.status == 404){
                            throw new Error("Github Repository is Private. Access Unavailable.");
                        }
                        else{
                            throw new Error(`An unexpected error has occured with the Github API. Error ${response.status}: ${response.json().message}`);
                            
                        }
                    }
                    return response.json();
                })
                .then(data => {
                    githubBtn.href = data.html_url;
                })
                .catch(error => {
                    githubStatus.innerHTML = error;
                    githubStatus.classList.add("alert-danger");
                    githubBtn.classList.add("disabled");
                })
        }
    }
}