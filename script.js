//on clicking on any of the cards eg. random dog , random cat etc 
//that card should be in focus , enlarged view while the rest of the cards blurred in the bacground 
const appletCards = document.querySelectorAll(".applet-card");
const gridContainer = document.querySelector(".grid-container");

let focusedCard = null;


appletCards.forEach(card => {
    card.addEventListener("click",(e) =>{
        e.stopPropagation(); // Prevent the click event from bubbling up to the document


      // If this card is already focused, do nothing
        if (focusedCard === card) return;

// Remove focus from any other card
if (focusedCard) {
  focusedCard.classList.remove("focused");
}

// Focus the clicked card
card.classList.add("focused");
focusedCard = card;
gridContainer.classList.add("focus-mode");
    });
    });


// Close focused card when clicking outside
    document.addEventListener("click", (e) => {
  if (!focusedCard) return;

  if (!focusedCard.contains(e.target)) {
    focusedCard.classList.remove("focused");
    focusedCard = null;
    gridContainer.classList.remove("focus-mode");
  }
});

// Close focused card on Escape key press
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && focusedCard) {
    focusedCard.classList.remove("focused");
    focusedCard = null;
    gridContainer.classList.remove("focus-mode");
  }
});



//beginging the dog app code 

const dogAPIUrl = "https://dog.ceo/api/breeds/image/random";

const dogBtn = document.getElementById("get-dog-button");
const dogImage = document.getElementById("dog-image");
const dogBreedText = document.getElementById("extra-text");

async function fetchRandomDog() {

    try {
    const response = await fetch(dogAPIUrl);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
        const data = await response.json(); 

        const imageUrl = data.message;
        const parts = imageUrl.split("/");
        const breedPart = parts[parts.indexOf("breeds") + 1];

         const breedName = breedPart
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

        dogImage.src = imageUrl;
        dogImage.style.display = "block";
        dogBreedText.innerText = `Breed: ${breedName}`;

    } catch (error) {
        dogBreedText.innerText = "Failed to fetch dog image. Please try again.";
        return;
    }
    
}

dogBtn.addEventListener("click", fetchRandomDog);

/*

function showDogBreed(imageUrl) {
  const parts = imageUrl.split("/");
  const breedPart = parts[parts.indexOf("breeds") + 1];

  const breedName = breedPart
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  dogBreedText.textContent = `Breed: ${breedName}`;
  
}
  */


//end of dog app code

//this part isfor the Cat App

const catAPIUrl = "https://api.thecatapi.com/v1/images/search";

const catImageBtn = document.getElementById("get-cat-button");
const catImage = document.getElementById("cat-image");

async function fetchRandomCat() {

    try{
    const response = await fetch(catAPIUrl);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const imageUrl = data[0].url;
    catImage.src = imageUrl;
    catImage.style.display = "block";
    
    } catch (error) {
        catImage.alt = "Failed to fetch cat image. Please try again.";
        return;
    }

    
}

catImageBtn.addEventListener("click", fetchRandomCat);

//this part isfor the Weather App 

const apiKey = "f67537c1035e9215773ba93c4df3176a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherWidget = document.querySelector(".weather");

async function getWeather(city) {

try {               
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      
    if (!response.ok) {
        throw new Error("City not found");
    }

    const data = await response.json();
    

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }

    weatherWidget.style.display = "block";     
}

catch (error) {
    alert("City not found. Please try again.");
    weatherWidget.style.display = "none"; 
}
}

    searchBtn.addEventListener("click", () => {
        getWeather(searchBox.value);
    });

    searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            getWeather(searchBox.value);
        }   

    });

//The end of the wes=ather app code 


//the currency converter app code
// ===== Currency Converter =====

const apiCurrencyKey = "9d439404f328ad7c5eff718c";
const currencyApiUrl =
  `https://v6.exchangerate-api.com/v6/${apiCurrencyKey}/latest/USD`;

const amountInput = document.getElementById("currency-amount");
const currencyInput = document.getElementById("tocurr-code");
const convertBtn = document.getElementById("get-currency-button");
const resultOutput = document.getElementById("currency-result");


async function convertCurrency() {

  const response = await fetch(currencyApiUrl);
  const data = await response.json();

  const amount = amountInput.value;

  const currencyCode = data.conversion_rates[currencyInput.value];

  const exchangedAmount = (amount * currencyCode)

  resultOutput.innerHTML = `${amount} USD = ${exchangedAmount.toFixed(2)} ${currencyInput.value}`;

}

convertBtn.addEventListener("click", convertCurrency);

//end of currency converter app code

//the movie app code
const movieBtn = document.getElementById("get-movies-button");
const yearSelect = document.getElementById("movie-year");
const genreSelect = document.getElementById("movie-genre");

const moviesOutput = document.getElementById("movies-output");

 


const apiUrlMovie = "https://api.tvmaze.com/shows";

async function fetchMovies() {

const response = await fetch(apiUrlMovie);
 
const data = await response.json();

  
const selectedYear = yearSelect.value;
const selectedGenre = genreSelect.value;

// Filter movies based on year and genre

   moviesOutput.innerHTML = "";
   const filteredMovies = data.filter(movie => {
 
  const movieYear = movie.premiered.split("-")[0]
        ? movie.premiered.split("-")[0]
        : null;

  
   if (selectedYear && movieYear !== selectedYear) {
        return false;
      }

 if (selectedGenre && !movie.genres.includes(selectedGenre)) {
        return false;
      }

  return true;
}).slice(0, 100);


  console.log(filteredMovies); //display first 10 movies that match criteria

   
 filteredMovies.forEach(film =>{

    const movieTitle = film.name ? film.name : "N/A" ;
    console.log(movieTitle) ;

    const movieSynopsis = film.summary ? film.summary: "N/A"; 
    console.log(movieSynopsis)

    const movieImage = film.image ? film.image.medium : "N/A";
    console.log(movieImage);

    const movieRating = film.rating ? film.rating.average : "N/A";
    console.log(movieRating)

    const filmYear = film.premiered.split("-")[0] ?  film.premiered?.split("-")[0] : "N/A" ; 
    console.log(filmYear)

    
    const card = document.createElement("div");
    card.classList.add("movie-card");


    card.innerHTML =`
    <img src = "${movieImage}">
    <div class = "movie-card-content">
        <h3>${movieTitle}</h3> 

        <div class="summary">Summary: ${movieSynopsis}</div>
        <button type="button" class="toggle-summary">Read more</button>        

        <p>Rating: ${movieRating}</p>
        <p>Year: ${filmYear}</p>
   </div>
    `;
    
    moviesOutput.appendChild(card);

const toggleBtn = card.querySelector(".toggle-summary");
const summaryEl = card.querySelector(".summary");

toggleBtn.addEventListener("click", () => {
summaryEl.classList.toggle("expanded");

  toggleBtn.textContent = summaryEl.classList.contains("expanded")
    ? "Show less"
    : "Read more";
});
})
}

//fetchMovies();
movieBtn.addEventListener("click", fetchMovies);



//const rating = movie.rating.average ?? "N/A";
//const runtime = movie.runtime ?? "N/A" ; 
//const poster = movie.image?.medium ?? " ";

//Beginning of GIT HUB applet 
console.log("Script loaded");

//const searchBtn = document.getElementById("searchBtn");

// Inputs
const countryInput = document.getElementById("country");
const languageInput = document.getElementById("language");
const recordsInput = document.getElementById("num-records");
//const searchInput = document.getElementById("q");

//const resultsGrid = document.querySelector(".results-grid");

const getUserBtn = document.getElementById("gitUser");
const resultsDiv = document.getElementById("results");
const loadMore = document.getElementById("loadMore");

let currentPage = 1; 

async function handleSearch(isLoadMore = false) {
  
    //controls pagination
    if(!isLoadMore){
        currentPage = 1;
        resultsDiv.innerHTML = "";
    }

    // 1. Read values from UI
   country = countryInput.value;
   language = languageInput.value;
   const results_per_page = Number(recordsInput.value);
  
  //const keyword = searchInput.value.trim();
   
  //const language = "Javascript";
  //const country = "Ghana";

  console.log(`"Language:", ${country}`);
  console.log(`"Country:", ${language}`);
  //console.log("Keyword:", keyword);
/*
  // 2. Build GitHub search query
  let queryParts = [];

  if (keyword) {
    queryParts.push(keyword);
  }

  if (language) {
    queryParts.push(`language:${language}`);
  }

  if (country) {
    queryParts.push(`location:${country}`);
  }
*/
  //const query = queryParts.join(" ");
  const query = `language:${language} location:${country}`;

  console.log("Final GitHub query:", query);

  // 3. Call GitHub API
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=${results_per_page}&page=${currentPage}`;

  console.log("Request URL:", url);

  //resultsGrid.innerHTML = "";

resultsDiv.innerHTML= "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("GitHub search results:", data);
    console.log("First user:", data.items[0]);
    
   // renderCandidates(data.items);
   const users = data.items || []; 
   const humanUsers = users.filter(user => user.type === "User");
   
   renderUsers(humanUsers);

    } catch (error) {
    console.error("GitHub API error:", error);
    resultsDiv.innerHTML = "<p> failed to load </p>";
    }
}

   function renderUsers (users){

    users.forEach(user =>{
    const card = document.createElement("div")
    card.className = "user-card";
    //const p = document.createElement("p")
    //p.textContent = user.login
    card.innerHTML = `
    
    <img src = "${user.avatar_url}" alt = "${user.login} />

    <div class = "user-info">

    <h3> ${user.login}</h3>
    <a href = "${user.html_url}" target = "_blank"> View GitHub </a>

    </div>
    `

    resultsDiv.appendChild(card);
   
});
}


//handleSearch();
getUserBtn.addEventListener("click", () => handleSearch(false));

loadMore.addEventListener("click", () =>{

    currentPage++;
    handleSearch(true);

})


// end of GIT HUB JS 




