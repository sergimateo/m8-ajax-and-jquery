/////////////////////
// Event Listeners //
/////////////////////

getJokeBtn.addEventListener('click', (ev) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.icndb.com/jokes/random', true);
  xhr.onload = function () {
    if (this.status == 200) {
      var jokeObject = JSON.parse(this.responseText);
      output = ' <div class="mt-4">' + jokeObject.value.joke + '</div>';
      jokeContainer.innerHTML = output;
    }
  }
  xhr.send();
});