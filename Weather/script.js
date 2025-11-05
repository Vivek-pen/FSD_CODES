
const API_KEY = "";  // <-- replace with your OpenWeatherMap key
const btn = document.getElementById("btn");
const cityInput = document.getElementById("city");
const ctx = document.getElementById("chart").getContext("2d");

btn.addEventListener("click", () => getWeather(cityInput.value, showWeather));


const getWeather = async (city, callback) => {
  if(!city) return alert("Enter a city!");
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
  
  try {
    const res = await fetch(url);          // Promise
    const data = await res.json();         // Await
    callback(data);                        // Callback
  } catch (err) {
    alert("Error fetching data");
  }
};

const showWeather = (data) => {
  if(data.cod !== "200") return alert("City not found!");

  const labels = data.list.slice(0,5).map(x => x.dt_txt.split(" ")[1]);
  const temps = data.list.slice(0,5).map(x => x.main.temp);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{ 
        label: `Temp in ${data.city.name} (°C)`, 
        data: temps, 
        borderColor: "blue", 
        fill: false 
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: false } } }
  });
};
