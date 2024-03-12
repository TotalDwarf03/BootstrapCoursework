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

    // Create Maps if on experience.html
    if (window.location.pathname.split("/").slice(-1) == "experience.html"){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initMaps, initMaps);
        } 
        else {
            console.log("Browser Does not Support Geolocation")
            initMaps();
        }
    }

    // Start Animation if on about.html
    if (window.location.pathname.split("/").slice(-1) == "about.html"){

        // This code comes from another script embedded in html.
        // Had to put this here as it was running before this script could setup the theme
        init();
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

// Google Maps API
async function initMaps(position) {
    const ukwdg = { lat: 51.5459, lng: -3.2671 };
    const ons = { lat: 51.5667, lng: -3.0273 }

    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    let maps = [];
    let markers = [];

    // UKWDG Map
    map = new Map(document.getElementById("map1"), {
        zoom: 10,
        center: ukwdg,
        mapId: "UKWDG",
    });

    // The marker, positioned at Uluru
    marker = new AdvancedMarkerElement({
        map: map,
        position: ukwdg,
        title: "UKWDG",
    });

    maps.push(map);
    markers.push(marker);

    // ONS Maps
    map = new Map(document.getElementById("map2"), {
        zoom: 10,
        center: ons,
        mapId: "ONS",
    });

    marker = new AdvancedMarkerElement({
        map: map,
        position: ons,
        title: "ONS",
    });
    
    maps.push(map);
    markers.push(marker);

    map = new Map(document.getElementById("map3"), {
        zoom: 10,
        center: ons,
        mapId: "ONS",
    });

    marker = new AdvancedMarkerElement({
        map: map,
        position: ons,
        title: "ONS",
    });
    
    maps.push(map);
    markers.push(marker);

    // Get current location using Geolocation API
    if(position.coords !== undefined){
        for(let i = 0; i < maps.length; i++){
            const devicePosition = { lat: position.coords.latitude, lng: position.coords.longitude }
            
            deviceMarkerImg = document.createElement("img");
            deviceMarkerImg.src = "../Images/mapsDevice.png";
            deviceMarkerImg.style.width = "40px"

            marker = new AdvancedMarkerElement({
                map: maps[i],
                position: { lat: devicePosition.lat, lng: devicePosition.lng },
                content: deviceMarkerImg,
                title: 'You!'
            })

            // Find Map midpoint between both markers and adjust map centre to it
            centrePoint = {
                lat: (devicePosition.lat + markers[i].position.lat) / 2,
                lng: (devicePosition.lng + markers[i].position.lng) / 2
            }

            console.log(centrePoint)

            maps[i].setCenter(centrePoint);
        }
    }
}