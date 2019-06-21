function displayResults (responseJson) {
    console.log(responseJson);
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
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      console.log(error);
    });
};
      
 /*     .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          //throw new Error(response.statusText);
          console.log(error);
        }
      )}
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        //part of an error object that is inherent in JavaScript
        $('#js-error-message').text(`Something went wrong: ${err.message}`)
      }); 
};*/

/*fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      //part of an error object that is inherent in JavaScript
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });*/

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const foodInput = $('#js-foodSearchInput').val();
    console.log(foodInput);
    //const maxResults = $('#js-max-results').val();
    //console.log(maxResults);
    getFood(foodInput/*, maxResults*/);
  });
}



$(watchForm);