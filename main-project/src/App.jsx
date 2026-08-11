import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import MainWeather from './components/MainWeather'
import TodayHighlights from './components/TodayHighlights'
import Footer from './components/Footer'
import { getForecast, getWeather } from './api/weather'
import { getCityImage } from './api/unsplash'
import { translateWeather } from './utils/weatherTranslations'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastDays, setForecastDays] = useState([])
  const [city, setCity] = useState('London')
  const [location, setLocation] = useState('London')
  const [cityImage, setCityImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const buildDailyForecast = (items = []) => {
    const groupedByDate = new Map()

   
    items.forEach((item) => {
      const [datePart, timePart] = item.dt_txt.split(' ')
      const hour = Number(timePart.slice(0, 2))
      const existing = groupedByDate.get(datePart)

      if (!existing) {
        groupedByDate.set(datePart, item)
        return
      }

      const existingHour = Number(existing.dt_txt.split(' ')[1].slice(0, 2))
      const currentDistance = Math.abs(hour - 12)
      const existingDistance = Math.abs(existingHour - 12)

      if (currentDistance < existingDistance) {
        groupedByDate.set(datePart, item)
      }
    })

    return [...groupedByDate.values()].slice(0, 5).map((item) => ({
      day: new Date(item.dt_txt).toLocaleDateString('pt-BR', { weekday: 'short' }),
      temp: Math.round(item.main.temp),
      description: translateWeather(item.weather?.[0]?.description),
      code: item.weather?.[0]?.id,
      icon: item.weather?.[0]?.icon,
    }))
  }

  useEffect(() => {
    let cancelled = false

    const loadData = async () => {
      setWeatherData(null)
      setForecastDays([])
      setCityImage(null)
      setIsLoading(true)
      const [weather, forecast] = await Promise.all([getWeather(location), getForecast(location)])

      if (cancelled) return
      setWeatherData(weather)

      if (forecast?.list) {
        setForecastDays(buildDailyForecast(forecast.list))
      }

      const image = await getCityImage(weather, city)
      if (cancelled) return
      setCityImage(image)
      setIsLoading(false)
    }

    loadData().catch((error) => {
      if (!cancelled) setIsLoading(false)
      console.error('Erro ao carregar dados:', error)
    })
    return () => {
      cancelled = true
    }
  }, [city, location])

  const handleSearch = ({ label, query }) => {
    setCity(label)
    setLocation(query)
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <Navbar onSearch={handleSearch} />

        <div className="gradient-card-wrap">
          <main className="relative overflow-hidden rounded-[calc(2rem-2px)] border border-white/10 shadow-2xl shadow-slate-950/30">
            <div className="weather-bg" aria-hidden="true" />
            <div className="flex flex-col gap-5 p-4 sm:p-6">
              <section className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
                      Local atual
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                      Tempo em {city}
                    </h1>
                  </div>
                </div>

                {cityImage && (
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl shadow-slate-950/30">
                    <img
                      src={cityImage}
                      alt={`Imagem de ${city}`}
                      className="h-56 w-full object-cover sm:h-64 lg:h-80"
                    />
                  </div>
                )}

                {isLoading && !weatherData && (
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                    <div className="h-80 animate-pulse rounded-[2rem] border border-white/10 bg-white/5" />
                    <div className="h-80 animate-pulse rounded-[2rem] border border-white/10 bg-white/5" />
                  </div>
                )}

                {weatherData && (
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                    <MainWeather weatherData={weatherData} forecastDays={forecastDays} />
                    <TodayHighlights weatherData={weatherData} />
                  </div>
                )}
              </section>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default App
