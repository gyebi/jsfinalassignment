//on clicking on any of the cards eg. random dog , random cat etc 
//that card should be in focus , enlarged view while the rest of the cards blurred in the bacground 

window.onload = function() {
  const cards = document.querySelectorAll('.grid-item');

  cards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove focus from all cards
      cards.forEach(c => c.classList.remove('focused'));
      // Add focus to clicked card
      this.classList.add('focused');
    });
  });
};

// JavaScript code for API calls and DOM manipulation

const dogButton = document.getElementById('get-dog-button');
const dogOutput = document.getElementById('dog-output');

// Attach event listener to the button (keeps compatibility if HTML still has onclick)
if (dogButton) {
  dogButton.addEventListener('click', getDogImage);
}

// Helper: capitalize first letter
function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

// Parse breed from Dog CEO image URL
function parseBreedFromUrl(url) {
  // example: https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg
  const parts = url.split('/');
  const idx = parts.indexOf('breeds');
  if (idx === -1 || !parts[idx + 1]) return null;

  const breedPart = parts[idx + 1]; // e.g., 'hound-afghan' or 'beagle'
  const bits = breedPart.split('-');

  if (bits.length === 1) return capitalize(bits[0]);
  return `${capitalize(bits[1])} ${capitalize(bits[0])}`; // 'Afghan Hound'
}

// Fetch and display a random dog image from Dog CEO API
async function getDogImage() {
  if (!dogOutput) return;

  // UI state
  dogButton.disabled = true;
  //dogOutput.textContent = 'Loading...';

  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const imgUrl = data.message;
    const breed = parseBreedFromUrl(imgUrl);

    // create or update image element
    let img = document.getElementById('dog-image');
    if (!img) {
      img = document.createElement('img');
      img.id = 'dog-image';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    }

    img.src = imgUrl;
    img.alt = breed ? `${breed} dog` : 'Random dog';

    // update output: put breed text and image
   // dogOutput.innerHTML = '';

    const breedEl = document.getElementById('extra-text') || document.createElement('p');
    breedEl.id = 'extra-text';
    breedEl.className = 'dog-breed';
    breedEl.textContent = `Breed: ${breed || 'Unknown'}`;

    dogOutput.appendChild(breedEl);
    dogOutput.appendChild(img);
  } catch (err) {
    dogOutput.textContent = 'Failed to fetch dog image.';
    console.error(err);
  } finally {
    dogButton.disabled = false;
  }
}


//this part isfor the Weather App 

const apiKey = "f67537c1035e9215773ba93c4df3176a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherWidget = document.querySelector(".weather");

async function getWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
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


    searchBtn.addEventListener("click", () => {
        getWeather(searchBox.value);
    });


