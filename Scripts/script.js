window.onload = function(){
    // Once windows loaded:

    // Check Local Storage API Support
    initialiseSessionStorage();

    // Check Drag and Drop API Support
    // If not supported hide the drag and drop theme controls and show the switch
    if(!dragDropSupportCheck()){
        document.getElementById("dragDropThemeControls").classList.add("hidden");
        document.getElementById("switchThemeControls").classList.remove("hideOnWidth")
    }
}

// Theme Controller
function toggleThemeDD(element){
    // Get current theme
    theme = document.documentElement.getAttribute("data-bs-theme");
    socketicon = document.getElementById("socketicon");

    if(theme == "dark"){
        let lightOn = new Audio("Audio/lightOn.wav");
        lightOn.play();

        // Change theme and apply to Session Storage if supported
        document.documentElement.setAttribute("data-bs-theme", "light");
        
        if(storageSupportCheck){
            sessionStorage.theme = "light";
        }
        
        socketicon.hidden = true;
    }
    else{
        let lightOff = new Audio("Audio/lightOff.wav");
        lightOff.play();

        // Change theme and apply to Session Storage if supported
        document.documentElement.setAttribute("data-bs-theme", "dark");
        
        if(storageSupportCheck){
            sessionStorage.theme = "dark";
        }

        socketicon.hidden = false;
    }
}

function toggleThemeSwitch(){
    // Get current theme
    theme = document.documentElement.getAttribute("data-bs-theme");

    if(theme == "dark"){
        // Change theme and apply to Session Storage if supported
        document.documentElement.setAttribute("data-bs-theme", "light");
        
        if(storageSupportCheck){
            sessionStorage.theme = "light";
        }

        // Change theme icon
        document.getElementById("themeIcon").className = "fa fa-sun-o";
    }
    else{
        // Change theme and apply to Session Storage if supported
        document.documentElement.setAttribute("data-bs-theme", "dark");
        
        if(storageSupportCheck){
            sessionStorage.theme = "dark";
        }

        // Change theme icon
        document.getElementById("themeIcon").className = "fa fa-moon-o";
    }
}

// Web Storage
function storageSupportCheck(){
    return typeof(Storage) !== "undefined" ? true : false;
}

/**
 * Initialises Session Storage
 * 
 * Called once HTML header is loaded
 */
function initialiseSessionStorage(){
    if(storageSupportCheck()){
        if(sessionStorage.theme == "dark"){
            document.documentElement.setAttribute("data-bs-theme", "dark");
        }
        else if(sessionStorage.theme == "light"){
            document.documentElement.setAttribute("data-bs-theme", "light");

            // Also need to manually move drag and drop
            battery = document.getElementById("Battery");
            socketicon = document.getElementById("socketicon");
            batterysocket = document.getElementById("BatterySocket");

            batterysocket.appendChild(battery);
            socketicon.hidden = true;

            // Also check theme switch and change label icon
            document.getElementById("themeSwitch").checked = true;
            document.getElementById("themeIcon").className = "fa fa-sun-o";

        }
        else{
            // If SessionStorage.theme isn't set, initialise it as dark to match default
            sessionStorage.theme = "dark";
        }
    }
}

// Drag and Drop
function dragDropSupportCheck(){
    return ('draggable' in document.createElement('div'));
}

function allowDrop(event){
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var element = document.getElementById(data)
    if (event.target.id == "socketicon"){
        event.target.parentElement.appendChild(element);
    }
    else {
        event.target.appendChild(element);
    }
    toggleThemeDD(element);
}