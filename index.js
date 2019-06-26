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

//display results of Yelp Search:
function displayYelpResults (responseJson) {
    console.log(responseJson);
    // if there are previous results, remove them
    $('#yelp-list').empty();
    // iterate through the foods array
    for (let i = 0; i < responseJson.businesses.length; i++){
      $('#yelp-list').append(
        //full name, description, website url
        `<li class="yelp_search_results"><h3>${responseJson.businesses[i].name}</h3>
            <p>Yelp Rating: ${responseJson.businesses[i].rating}</p>
            <p>Address: ${responseJson.businesses[i].location}</p>
            <p>Website: <a href=${responseJson.businesses[i].url}" target="blank">${responseJson.businesses[i].url}</a></p>
        </li>`
      )};
    //display the results section  
    $('#yelpResults').removeClass('hidden');
}

//format the Yelp query string
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
  console.log(queryItems);
};

//using the CORS anywhere via AJAX, I am able to work around the lack of 
//CORS in the Yelp Fusion API (https://cors-anywhere.herokuapp.com/)
function getYelpSearchCORS(cuisine, location) {
  const key = 'Bearer e22MteLr3U7vSCAvs8z_IW1D4idyatIKLL7Nu9_A8WNLQK0zwAUTsHQPQAt-ETB8wZ-75nBmsAWlTSH_jhJSQ1s97dlsweUolaz47V1gF7Q8wTExQRFOZ0TS_IsRXXYx';
  const originalURL = 'https://api.yelp.com/v3/businesses/search';
  let cuisineInput = $('#js-yelpCuisineSearchInput').val()
  let locationInput = $('#js-yelpLocationSearchInput').val()
  const params = {
    term: `${cuisineInput}`,
    location: `${locationInput}`
  };
  const queryString = formatQueryParams(params);
  const queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL + '?' + queryString;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "json",
    headers: {
      "x-requested-with": "xhr",
      "Authorization": `${key}`,
      "Content-Type": "application/json"
    }
  }).done(function(response) {
    console.log('CORS anywhere response', response);
    displayYelpResults(response);
  }).fail(function(jqXHR, textStatus) {
    console.error(textStatus);
  })
}

//Nutritionix Natural Exercise API Call
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

//add YouTube code here:

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
  //just trying to validate response
  $('#js-yelp-form').submit(event => {
    event.preventDefault();
    let cuisineInput = $('#js-yelpCuisineSearchInput').val();
    let locationInput = $('#js-yelpLocationSearchInput').val();
    getYelpSearchCORS(cuisineInput,locationInput);
  })
}

$(watchForm);