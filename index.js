'use strict';

function displayResults(result) {

  console.log(result);
  $('#results-list').empty();


  console.log('There are ' + result.length + ' repos');
  console.log(result[1].id);

  for (let i = 0; i < result.length; i++){ 
    $('#results-list').append(`
      <li>
        <h3>
          <a href="${result[i].svn_url}">${result[i].name}</a>
        </h3>
      </li>
    `)
  $('#results').removeClass('hidden');
  }; 
};

function getNews(query) {
  let userName = '';
  let userQuery = '';
  let searchURL = `https://api.github.com/users/`;

  userName = `${query}`;
  userQuery = userName + `/repos`;
  console.log('userName is ' + userName);
  console.log('userQuery is ' + userQuery);
  const url = searchURL + userQuery;
  console.log(url);

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/vnd.github.mercy-preview+json");  

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url, requestOptions)
    .then(response => response.json())
/*  .then(result => console.log(result)) */
    .then(responseJson => displayResults(responseJson))
    .catch(error => console.log('error', error));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getNews(searchTerm);
  });
}

$(watchForm);