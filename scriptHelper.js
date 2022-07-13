// Write your helper functions here!

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    //Here is the HTML formatting for our mission target div.
    let output = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${imageUrl}">

    `;
    document.getElementById("missionTarget").innerHTML = output;
}
window.addEventListener("load", function () {
    let forms = this.document.querySelector("#launchForm");
    forms.addEventListener("submit", function (event) {
        event.preventDefault();
        //alert("submit clicked");
        let pilotName = document.getElementById("pilotName").value
        console.log(pilotName);
        let coPilot = document.querySelector("input[name='copilotName']").value
        let fuelLevel = document.querySelector("input[name='fuelLevel']").value
        let cargoMass = document.querySelector("input[name='cargoMass']").value
        let list = document.getElementById("faultyItems");

        formSubmission(document, list, pilotName, coPilot, fuelLevel, cargoMass);
            
            
        

    })

});

function validateInput(testInput) {
    if (testInput == "") {
        return "Empty";
    } else if (!isNaN(testInput)) {
        return "Is a number";
    } else if (isNaN(testInput)) {
        return "Is not a number";
    }
}




function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let validatePilot = validateInput(pilot);
    console.log(validatePilot); 
    let validateCopilot = validateInput(copilot);
    let validatefuelLevel = validateInput(fuelLevel);
    let validatecargoMass = validateInput(cargoLevel);

    if (validatePilot == "Empty" || validateCopilot == "Empty" || validatefuelLevel == "Empty" || validatecargoMass == "Empty") {
        alert("All fields are required");
        return;
    } 
    if (validatePilot == "Is a number" || validateCopilot == "Is a number") {
        alert("Pilot and Copilot Must be names");
        return;
    } 
    if (validatefuelLevel == "Is not a number" || validatecargoMass == "Is not a number") {
        alert("Fuel Number and CargoMass must be numbers");
        return;
    }
    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").innerHTML = `Copilot ${copilot} is ready for launch`;
    if (fuelLevel < 10000) {
        document.getElementById("fuelStatus").innerHTML = "Fuel level is too low for launch";
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = "red";
        list.style.visibility = "visible";
    } else {
        document.getElementById("fuelStatus").innerHTML = "Fuel level is high enough for launch";
    }
    if (cargoLevel > 10000) {
        document.getElementById("cargoStatus").innerHTML = "Cargo Mass is too high for launch";
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = "red";
        list.style.visibility = "visible";
    } else {
        document.getElementById("cargoStatus").innerHTML = "Cargo Mass is low enough for launch";
    }
    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
        document.getElementById("launchStatus").style.color = "green";
        list.style.visibility = "hidden";

    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
