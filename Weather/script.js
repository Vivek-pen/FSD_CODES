const key = ""; // <-- your OpenWeatherMap API key
const $ = id => document.getElementById(id);
const ctx = $("chart").getContext("2d");

$("btn").onclick = async () => {
  const city = $("city").value.trim();
  if (!city) return alert("Enter a city!");

  try {
    const r = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`);
    const d = await r.json();
    if (d.cod !== "200") return alert("City not found!");

    const t = d.list.slice(0,5);
    new Chart(ctx, {
      type: "line",
      data: {
        labels: t.map(x => x.dt_txt.split(" ")[1]),
        datasets: [{ label: `Temp in ${d.city.name} (°C)`, data: t.map(x => x.main.temp), borderColor: "blue" }]
      }
    });
  } catch { alert("Error fetching data"); }
};
