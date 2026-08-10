import { COUNTRY_NAMES, POSITIVE_WORDS, NEGATIVE_WORDS } from '../utils/constants'

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export const getCityImage = async (weather, fallbackCity) => {
  if (!UNSPLASH_ACCESS_KEY) return null

  const place = weather?.name || fallbackCity
  const countryName = COUNTRY_NAMES[weather?.sys?.country]
  const query = countryName ? `${place} ${countryName} skyline` : `${place} skyline`

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=6&content_filter=high&client_id=${UNSPLASH_ACCESS_KEY}`
    )
    const data = await response.json()
    return pickBestCityImage(data.results, place)
  } catch (error) {
    console.error('Erro ao buscar imagem da cidade:', error)
    return null
  }
}

const pickBestCityImage = (results, cityName) => {
  if (!Array.isArray(results) || results.length === 0) return null
  const normalizedCity = cityName.toLowerCase()

  const scorePhoto = (photo) => {
    const text = `${photo.alt_description || ''} ${photo.description || ''} ${(photo.tags || []).map((tag) => tag.title).join(' ')}`.toLowerCase()
    let score = text.includes(normalizedCity) ? 10 : 0
    for (const word of POSITIVE_WORDS) {
      if (text.includes(word)) score += 2
    }
    for (const word of NEGATIVE_WORDS) {
      if (text.includes(word)) score -= 4
    }
    return score
  }

  const best = [...results].sort((a, b) => scorePhoto(b) - scorePhoto(a))[0]
  return best?.urls?.regular || null
}
