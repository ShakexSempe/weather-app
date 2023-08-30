import axios from 'axios'

// https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime

export function getWeather(lat, lon, timezone) {
    return axios.get("https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime", {
        params: {
            latitude: lat,
            longitude: lon,
            timezone,
        }
    })
    // .then(({ data }) => {
    //     return {
    //         current: parseCurrentWeather(data) ,
    //         daily: parseDailyWeather(data),
    //         hourly: parseHourlyWeather(data) 
    //     }
    // })
}

function parseCurrentWeather({ current_weather, daily }) {
    const {
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode
    } = current_weather;

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLikeTemp],
        apparent_temperature_min: [minFeelsLikeTemp],
        precipitation: [precip],
    } = daily

    

    return {
        currentTemp,
        highTemp: maxTemp,
        lowTemp: minTemp,
        hightFeelsLike: maxFeelsLikeTemp,
        lowFeelsLike: minFeelsLikeTemp,
        windSpeed,
        precip: precip,
        iconCode,
    }
}