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
        const iconCode = data.weather[0].icon;

        
        const weatherTime = new Date(
            (data.dt + data.timezone) * 1000
        ).toISOString().replace('T', ' ').slice(0, 19);

   


        result.innerHTML = `
        <div class="weather-card">
             <style>
                .weather-card {
                    background-color: #201818;
                    border: 1px solid #131111;
                    padding: 20px;
                    margin: 20px 0;
                    color: #a7ca09;
                }
                
                .weather-card img {
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
                    opacity: 1;
                    filter: none;
                }
            </style>
            <h2>${data.name}</h2>

            <h3>${new Intl.DisplayNames(['en'], { type: 'region' }).of(data.sys.country)}</h3>
            <p>Weather Recorded (Local Time)as of: ${weatherTime}</p>

            <h1>${data.main.temp}°C</h1>

         <img
                src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
                alt="Weather icon"
            >

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