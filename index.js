const KEY='96b947a45d33d7dc1c49af3203966408'
const input = document.querySelector('#city');
const btn = document.querySelector('.submit-btn');
const card = document.querySelector('.card')
const cityInfo = document.querySelector('.city-info');
const weatherType = document.querySelector('.weather-type');
const weatherTemp = document.querySelector('#temp');
const img = document.querySelector('.weather-icon');
const alertMsg = document.querySelector('.alert-message')
const alertBox = document.querySelector('.alert')

async function getData(e) {
   e.preventDefault()
   const city = input.value;
   const BASE = 'https://api.openweathermap.org/data/2.5/weather'
   const QUERY= `?q=${city}&units=metric&appid=${KEY}`
   const api = BASE+QUERY;

   const res = await fetch(api);
   const data = await res.json();

   if(data.cod == 404) {
      alertBox.style.display = 'block'
      alertMsg.innerHTML = `City not found! ${city}`
      card.style.display = 'none'
   } else if(data.cod == 400) {
      alertBox.style.display = 'block'
      alertMsg.innerHTML = `Please enter a country!`
      card.style.display = 'none'
   } else {
      const temp = data?.main?.temp;
      const icon = data?.weather[0]?.icon;
      const cityName = data?.name;
      const country = data?.sys?.country
      const type = data?.weather[0]?.main;
      card.style.display = 'block';
      cityInfo.innerHTML = `${cityName}, ${country}`
      weatherType.innerHTML = type;
      weatherTemp.innerHTML = Math.ceil(temp);
      img.src = `https://openweathermap.org/img/w/${icon}.png`;
      alertBox.style.display = 'none'
   }
   input.value = '';
}

btn.addEventListener('click', getData)