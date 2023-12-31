// Write your JavaScript code here!

const { formSubmission } = require("./scriptHelper");
//const willThisWork = require("./scriptHelper.js");
//alert("test");
window.addEventListener("load", function() {
    //example 'add alerts and validation' from the book:
    let form = document.querySelector("form");
    form.addEventListener("submit", function(evt) {
        let pilotNameInput = document.querySelector("input[name=pilotName]").value;
        let copilotNameInput = document.querySelector("input[name=copilotName]").value;
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;
        let cargoMassInput = document.querySelector("input[name=cargoMass]").value;
        formSubmission(document, "", pilotNameInput, copilotNameInput, fuelLevelInput, cargoMassInput);
        // stop the form submission 
        evt.preventDefault();   
    });
    
   
    let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planet = pickPlanet(listedPlanets);
       let name = planet.name;
       let diameter = planet.diameter;
       let star = planet.star;
       let distance = planet.distance;
       let imageUrl = planet.image;
       let moons = planet.moons;
       addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
   })
   
});