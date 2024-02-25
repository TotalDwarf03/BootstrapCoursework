function printTechStack(techstack){
    techstackHTML = ""

    for(let i = 0; i < techstack.length; i++){
        techstackHTML += `<li class="list-inline-item ">${techstack[i]}</li>`;
    }

    return techstackHTML;
}