// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById('missionTarget');
   missionTarget.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                   <li>Name: ${name}</li>
                   <li>Diameter: ${diameter} </li>
                   <li>Star: ${star}</li>
                   <li>Distance from Earth: ${distance}</li>
                   <li>Number of Moons: ${moons}</li>
               </ol>
               <img src='${imageUrl}'>
               `
  }

function validateInput(testInput) {
    // take in a string as a parameter and return "Empty", 
    // "Not a Number", or "Is a Number" as appropriate
    if (testInput === "") {
        return "Empty";
    }
    else if (isNaN(testInput)) {
        return "Not a Number";
    }
    else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let validationObj = {
        "pilot": validateInput(pilot),
        "copilot": validateInput(copilot),
        "fuelLevel": validateInput(fuelLevel),
        "cargoLevel": validateInput(cargoLevel)
    }

    if (validationObj.pilot === "Empty" || validationObj.copilot === "Empty" || 
        validationObj.fuelLevel === "Empty" || validationObj.cargoLevel === "Empty") {
        alert("All fields are required!");
        return false;
    }

    if (validationObj.pilot === "Is a Number" || validationObj.copilot === "Is a Number") {
        alert("Pilot and Co-pilot cannot be numbers!!");
        return false;
    }

    if (validationObj.fuelLevel === "Not a Number" || validationObj.cargoLevel === "Not a Number") {
        alert("Fuel Level and Cargo Level must be numbers!!!");
        return false;
    }

    document.getElementById("pilotStatus").innerHTML=`Pilot ${pilot} Ready`;    
    document.getElementById("copilotStatus").innerHTML=`Co-pilot ${copilot} Ready`;

    //If fuel level less than 10,000 change faultyItems to visible with an updated fuel status "there is not enough fuel for the journey"
    //h2 launchStatus, should also change to "Shuttle not ready for launch" and the color should change to red. 
    //If cargo mass more than 10,000, change list to visible with cargo status stating "there is too much mass for the shuttle to take off." 
    //launchStatus should also change to "Shuttle not ready for launch" and the color should change to red. 
    //else If the shuttle is ready to launch, change the text of launchStatus to green and display "Shuttle is ready for launch"
    let faultyItems = document.getElementById("faultyItems");
    let launchStatus = document.getElementById("launchStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    if (fuelLevel < 10000 || cargoLevel > 10000) {
        faultyItems.style.visibility="visible";       
        launchStatus.innerHTML="Shuttle not ready for launch.";
        launchStatus.style.color="red";        
    } 
    else {
        launchStatus.innerHTML="Shuttle is ready for launch.";
        launchStatus.style.color="green"; 
    }
    
    if (fuelLevel < 10000) {
        fuelStatus.innerHTML="There is not enough fuel for the journey." ; 
    }
    else {
        fuelStatus.innerHTML="Fuel level high enough for launch." ;
    }

    if (cargoLevel > 10000) {
        cargoStatus.innerHTML="There is too much mass for the shuttle to take off.";      
    }
    else {
        cargoStatus.innerHTML="Cargo mass low enough for launch.";
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random() * planets.length);
    return planets[randomPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
