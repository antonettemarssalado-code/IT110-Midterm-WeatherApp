const apiKey = "914bbf16585da473f0a7aa9917a3c19f";

async function getWeather(){

    const city =
    document.getElementById("city").value;

    const result =
    document.getElementById("result");

    if(city.trim() === ""){

        result.innerHTML = `
            <p style="color:red;">
                Please enter a city name.
            </p>
        `;
        return;
    }

    try{

        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("Invalid City");
        }

        const data = await response.json();

        result.innerHTML = `
        <div class="weather-card">

            <h2>${data.name}</h2>

            <h3>${data.sys.country}</h3>

            <h1>${data.main.temp}°C</h1>

            <p>
                Weather:
                ${data.weather[0].description}
            </p>

            <p>
                Humidity:
                ${data.main.humidity}%
            </p>

            <p>
                Wind Speed:
                ${data.wind.speed} m/s
            </p>

        </div>
        `;

    }
    catch(error){

        result.innerHTML = `
            <p style="color:red;">
                Could not fetch data.
                Please try again.
            </p>
        `;
    }
}