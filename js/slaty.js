if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  console.log("Geolocation is not supported by this browser");
}

let lat;
let long;

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  getData()
}

function getData() {
  // Fetch timings with geoLocation (Google)
  fetch(`http://api.aladhan.com/v1/timings/:date?latitude=${lat}&longitude=${long}&method=4`, {method : "GET"})
    .then(response => response.json())
    .then(response => {
      document.querySelector(".todayDate").textContent = response.data.date.readable;
      document.getElementById("fajr").textContent = response.data.timings.Fajr
      document.getElementById("sunrise").textContent = response.data.timings.Sunrise
      document.getElementById("dhuhr").textContent = response.data.timings.Dhuhr
      document.getElementById("asr").textContent = response.data.timings.Asr
      document.getElementById("maghrib").textContent = response.data.timings.Maghrib
      document.getElementById("isha").textContent = response.data.timings.Isha
    })
    .catch(error => console.error(error));
  
  // Fetch place name latitude & longitude (open cage data)
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=8a7a653b023f42b181f8a6815e73a0f5`)
    .then(response => response.json())
    .then(response => {
      document.querySelector(".currentLocation").textContent = `${response.results[0].components.country}, ${response.results[0].components.state}`
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert to 12-hour format
  const formattedTime = hours + ':' + minutes + ':' + seconds + ' ' + amOrPm;
  document.getElementById('timeNow').textContent = formattedTime;
}

setInterval(updateTime, 1000); // update the time display every second
