const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const getWeather = async (cityName) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`
  )
  return response.json()
}

export const getForecast = async (cityName) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`
  )
  return response.json()
}
