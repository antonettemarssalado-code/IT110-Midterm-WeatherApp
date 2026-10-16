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
                    position: relative;
                    background-color: #000000fa;
                    border: 2px solid #0b883b;
                    padding: 20px;
                    margin: 20px 0;
                    color: #b8b8a2;
                    text-align: left;
                    border-radius: 20px;
                    box-sizing: border-box;
                    overflow-wrap: break-word;
                }

                .weather-card img {
                    position: absolute;
                    top: 70px;
                    right: 80px;
                    width: 150px;
                    height: 140px;
                    object-fit: contain;

                    animation: weatherGlow 2s ease-in-out infinite;
                }

                @keyframes weatherGlow {
                    0%, 100% {
                        filter: drop-shadow(0 0 5px #ffffff);
                    }

                    50% {
                        filter: drop-shadow(0 0 20px #fcfff0);
                    }
                }

                .weather-temp {
                    font-size: 70px;
                    color: #a7ca09;
                }

                /* Phone responsiveness */
                @media (max-width: 600px) {
                    .weather-card {
                        padding: 15px;
                        margin: 15px 0;
                    }

                    .weather-card img {
                        top: 65px;
                        right: 10px;
                        width: 85px;
                        height: 85px;
                    }

                    .weather-temp {
                        font-size: 45px;
                    }

                    .weather-card h1 {
                        font-size: 32px;
                    }

                    .weather-card h2 {
                        font-size: 22px;
                    }

                    .weather-card h3 {
                        font-size: 18px;
                    }

                    .weather-card p {
                        font-size: 14px;
                        overflow-wrap: anywhere;
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