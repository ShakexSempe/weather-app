import axios from 'axios'

export function getWeather(lat, lon, timezone) {
    return axios.get("https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime", {
        params: {
            latitude: lat,
            longitude: lon,
            timezone,
        },
    })
    .then(({ data }) => {
        return data 
        return {
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            // hourly: parseHourlyWeather(data) 
        }
    })
}

function parseCurrentWeather({ current_weather, daily }) {
    const {
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode,
    } = current_weather;

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLikeTemp],
        apparent_temperature_min: [minFeelsLikeTemp],
        precipitation_sum: [precip],
    } = daily

    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        hightFeelsLike: Math.round(maxFeelsLikeTemp),
        lowFeelsLike: Math.round(minFeelsLikeTemp),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip * 100) / 100,
        iconCode,
    }
}

function parseDailyWeather({ daily }) {
    return daily.time.map((time,index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
        }
    })
}