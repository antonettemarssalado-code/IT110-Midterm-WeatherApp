const apiKey = "914bbf16585da473f0a7aa9917a3c19f";

async function getWeather(){

    const btn = document.getElementById("btn-w");
    btn.disabled=true;
    const city =
    document.getElementById("city").value;

    const result =
    document.getElementById("result");

    // Check if the city input is empty
    if(city.trim() === ""){

        result.innerHTML = `
            <p style="color:red;">
                Please enter a city name.
            </p>
        `;
        return;
    }
// Fetch weather data from OpenWeatherMap API
    try{
            // try to fetch the weather data from the OpenWeatherMap API using the provided city name and API key. 
            // If the response is not ok, throw an error indicating that the city is invalid. Otherwise,
            //  parse the response as JSON and extract the necessary data, including the weather icon code 
            // and the local time of the weather recording. Finally, update the result element with a styled 
            // weather card displaying the fetched weather information.


            //fetch the weather data from the OpenWeatherMap API using the provided city name and API key.
            //await is used to wait for the response from the API before proceeding with the rest of the code.
        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        // If the response is not ok, throw an error indicating that the city is invalid.
        if(!response.ok){
            throw new Error("Invalid City");
        }
        const data = await response.json();
        const iconCode = data.weather[0].icon;

        // Extract the local time of the weather recording by adding the timezone offset
        //  to the timestamp and converting it to a human-readable format.
        const weatherTime = new Date(
            (data.dt + data.timezone) * 1000
        ).toISOString().replace('T', ' ').slice(0, 19);

        
        //data.dt = 1792216800 specific moment in time.;
        //data.timezone = UTC+8 , 8 * 60 * 60 = 28,800 seconds, which is the offset from UTC in seconds;
        //toISOString() converts the date to an ISO string format,
        //  which includes the date and time in a standardized format.

//slice(0, 19) is used to remove the milliseconds and timezone information
//  from the ISO string, leaving only the date and time in a readable format.
   


        result.innerHTML = `
        <div class="weather-card">
             

<style>
    /* Weather card */
    .weather-card {
        position: relative;
        background: linear-gradient(135deg, #0b1f3a, #102f55);
        border: 1px solid #38bdf8;
        padding: 25px;
        margin: 20px 0;
        color: #dbeafe;
        border-radius: 20px;
        overflow: hidden;
        transition: 0.3s;
        animation: appear 0.7s ease;
    }

    /* Hover effect */
    .weather-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 20px #075985;
    }

    /* Headings */
    .weather-card h2 {
        color: white;
        margin: 15px 0;
        font-size: 30px;
    }

    .weather-card h3 {
        color: #7dd3fc;
        margin-bottom: 10px;
    }

    .weather-card p {
        color: #b8cce5;
        margin: 10px 0;
    }

    /* Temperature */
    .weather-temp {
        color: #7dd3fc;
        font-size: 65px;
        margin: 10px 0;
        animation: glow 2s infinite;
    }

    /* Weather icon */
    .weather-card img {
        position: absolute;
        top: 70px;
        right: 35px;
        width: 140px;
        height: 140px;
        object-fit: contain;
        animation: float 3s infinite ease-in-out;
    }

    /* Card entrance */
    @keyframes appear {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Temperature glow */
    @keyframes glow {
        50% {
            text-shadow: 0 0 15px #38bdf8;
        }
    }

    /* Floating icon */
    @keyframes float {
        50% {
            transform: translateY(-10px);
        }
    }

    /* Mobile design */
    @media (max-width: 600px) {
        .weather-card {
            padding: 18px;
        }

        .weather-card h2 {
            font-size: 24px;
            max-width: 60%;
        }

        .weather-card img {
            width: 90px;
            height: 90px;
            top: 85px;
            right: 10px;
        }

        .weather-temp {
            font-size: 45px;
        }
    }
</style>


             <h3>${new Intl.DisplayNames(['en'], { type: 'region' }).of(data.sys.country)}</h3>
            <p>Weather Recorded (Local Time)as of: </p>
            <p>${weatherTime}</p>

            <h2>${data.name}</h2>

           
            <h1 class="weather-temp">${data.main.temp}°C</h1>

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
        btn.disabled = false;
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