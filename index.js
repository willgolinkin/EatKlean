'use strict';

function displayNutrientResults (responseJson) {
    console.log(responseJson);
    // if there are previous results, remove them
    $('#results-list').empty();
    // iterate through the foods array
    for (let i = 0; i < responseJson.foods.length; i++){
      $('#results-list').append(
        //full name, description, website url
        `<li class="nutrients"><h3>${responseJson.foods[i].food_name}</h3>
            <p>Calories: ${responseJson.foods[i].nf_calories}</p>
            <p>Protein: ${responseJson.foods[i].nf_protein}</p>
            <p>Carbohydrates: ${responseJson.foods[i].nf_total_carbohydrate}</p>
            <p>Fat: ${responseJson.foods[i].nf_total_fat}</p>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  }

function getFood (food) {
    /*let foodSearchQuery = $('#js-foodSearchInput').val();*/
    const key = '1f2cf89d3bcd0b21bf0dc8a2c0432300';
    const appId = '3add8282';
    const endpointUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    /*const response =*/ 
    return fetch (
      endpointUrl,
      {
        method: "post",
        headers: {
          "x-app-key": `${key}`,
          "x-app-id": `${appId}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "query": `${food}`
        })
      }
    )
      
    .then(response => {
      return response.json();
    })
    .then(responseJson => displayNutrientResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
      console.log(error);
    });
};

function displayExerciseResults (responseJson) {
    console.log(responseJson);
    // if there are previous results, remove them
    $('#exercise-list').empty();
    // iterate through the foods array
    for (let i = 0; i < responseJson.exercises.length; i++){
      $('#exercise-list').append(
        //full name, description, website url
        `<li class="calories_burned"><h3>${responseJson.exercises[i].user_input}</h3>
            <p>Calories Burned: ${responseJson.exercises[i].nf_calories}</p>
        </li>`
      )};
    //display the results section  
    $('#exerciseResults').removeClass('hidden');
  }

function getExercise(exercise) {
    /*let foodSearchQuery = $('#js-foodSearchInput').val();*/
    const key = '1f2cf89d3bcd0b21bf0dc8a2c0432300';
    const appId = '3add8282';
    const endpointUrl = 'https://trackapi.nutritionix.com/v2/natural/exercise';
    /*const response =*/ 
    return fetch (
      endpointUrl,
      {
        method: "post",
        headers: {
          "x-app-key": `${key}`,
          "x-app-id": `${appId}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "query": `${exercise}`
        })
      }
    )
      
    .then(response => {
      return response.json();
    })
    .then(responseJson => displayExerciseResults(responseJson))
    .catch(error => {
      //error not working for random string of exercise
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
      console.log(error);
    });
};


//uses innerWidth method as a conditional for displaying hamburger nav
function showHamburgerNav () {
  let hamburger = document.getElementById("hamburgerNav");
  //let desktopNav = document.getElementById("desktop_nav");
  if (window.innerWidth <= 375) {
      hamburger.display === "block";
    } else {
      hamburger.display === "none";
    }
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleNavLinks() {
  let hamburgerLinks = document.getElementById("myLinks");
  if (hamburgerLinks.style.display === "block") {
    hamburgerLinks.style.display = "none";
  } else {
    hamburgerLinks.style.display = "block";
  }
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const foodInput = $('#js-foodSearchInput').val();
    console.log(foodInput);
    getFood(foodInput);
  })
  $('#js-exercise-form').submit(event => {
    event.preventDefault();
    const exerciseInput = $('#js-exerciseSearchInput').val();
    console.log(exerciseInput);
    getExercise(exerciseInput);
  })
}

$(watchForm);