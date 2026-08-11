import { COUNTRIES, COUNTRY_NAMES } from '../utils/constants'

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const buildLocationParams = (location) => {
  const params = new URLSearchParams({ appid: WEATHER_API_KEY, units: 'metric' })

  if (typeof location === 'string') {
    params.set('q', location)
  } else {
    params.set('lat', String(location.lat))
    params.set('lon', String(location.lon))
  }

  return params
}

export const getWeather = (location) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?${buildLocationParams(location)}`).then((response) =>
    response.json()
  )
}

export const getForecast = (location) => {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?${buildLocationParams(location)}`).then((response) =>
    response.json()
  )
}

const normalize = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

const matchCountries = (query) => {
  const normalized = normalize(query.trim())
  if (normalized.length < 2) return []

  return COUNTRIES.filter(
    (country) =>
      normalize(country.pt).includes(normalized) || normalize(country.en).includes(normalized)
  )
    .slice(0, 3)
    .map((country) => ({
      kind: 'country',
      code: country.code,
      name: country.pt,
      label: `${country.pt} (país)`,
      display: country.pt,
      capital: country.capital,
      query: country.pt,
    }))
}

export const getCitySuggestions = async (query) => {
  const trimmed = query.trim()
  if (!trimmed) return []

  const countries = matchCountries(query)

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(trimmed)}&limit=8&appid=${WEATHER_API_KEY}`
    )
    if (!response.ok) return countries
    const locations = await response.json()
    if (!Array.isArray(locations)) return countries

    const seen = new Set()
    const cities = []

    locations.forEach((location) => {
      const countryName = COUNTRY_NAMES[location.country] || location.country
      const key = `${location.name}|${location.state || ''}|${location.country}|${location.lat}|${location.lon}`
      if (seen.has(key)) return
      seen.add(key)

      cities.push({
        kind: 'city',
        name: location.name,
        state: location.state || null,
        code: location.country,
        countryName,
        label: [location.name, location.state, countryName].filter(Boolean).join(', '),
        display: location.name,
        lat: location.lat,
        lon: location.lon,
        query: {
          lat: location.lat,
          lon: location.lon,
        },
      })
    })

    return [...countries, ...cities]
  } catch (error) {
    console.error('Erro ao buscar sugestões:', error)
    return countries
  }
}


export const resolveCountryCapital = async (country) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(`${country.capital},${country.code}`)}&limit=1&appid=${WEATHER_API_KEY}`
  )
  const [location] = await response.json()
  if (!location) return null
  return { lat: location.lat, lon: location.lon }
}
