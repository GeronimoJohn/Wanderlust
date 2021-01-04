// Foursquare API Info
const clientId = "LXUPR34XAOKT2VWBI5DODF3ZEPCV0WGVXSM55ITYBYXAT4YO";
const clientSecret = "XKULTE3XV2YLMNJLSPHECISOFQFCODBVCYVXM1PGSS3O2ADA";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// OpenWeather Info
const openWeatherKey = "2b0a3a96a19b8d779cb9f37c9b1f7486";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Add AJAX functions here:
// Connects to Foursquare API
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210104`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      // this gets the data from foursquare in the JSON format
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      // sets the venue data from the json response variable to venues
      const venues = jsonResponse.response.groups[0].items.map(
        (item) => item.venue
      );
      console.log(venues);

      return venues;
    }
  } catch (error) {
    console.log(error);
  }
};

// Connects to OpenWeather API
const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:

    let venueContent = "";
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  // Add your code here:

  let weatherContent = "";
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues();
  getForecast();
  return false;
};

$submit.click(executeSearch);
