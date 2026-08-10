import WbSunnyIcon from '@mui/icons-material/WbSunny'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import CloudIcon from '@mui/icons-material/Cloud'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ThermostatIcon from '@mui/icons-material/Thermostat'

const MainWeather = ({ weatherData, forecastDays = [] }) => {
  const temperatureCelsius = weatherData?.main?.temp ?? 'N/A'
  const weatherDescription = weatherData?.weather?.[0]?.description || 'N/A'
  const cityName = weatherData?.name || 'Cidade Indisponível'
  const countryName = weatherData?.sys?.country || 'País Indisponível'
  const timestamp = weatherData?.dt || null

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    })
    : 'Data Indisponível'

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <WbSunnyIcon style={{ fontSize: '2.5rem', color: '#f59e0b' }} />
    }

    if (temperatureCelsius < 10) {
      return <AcUnitIcon style={{ fontSize: '2.5rem', color: '#38bdf8' }} />
    }

    return <CloudIcon style={{ fontSize: '2.5rem', color: '#cbd5e1' }} />
  }

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20 sm:p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-cyan-200/80">Agora</p>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <p className="text-5xl font-semibold leading-none text-white sm:text-6xl">
              {temperatureCelsius}
              <span className="align-top text-xl">°C</span>
            </p>
            <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 text-white/90">
              {renderTemperatureIcon()}
            </div>
          </div>

          <p className="mt-3 max-w-xl text-base capitalize text-slate-300">
            {weatherDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1.5">
              <CalendarMonthIcon fontSize="small" />
              <span className="capitalize">{currentDate}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1.5">
              <LocationOnIcon fontSize="small" />
              <span>
                {cityName}, {countryName}
              </span>
            </span>
          </div>
        </div>

        <div className="grid min-w-0 gap-3 rounded-2xl border border-slate-700 bg-slate-800/70 p-3 sm:grid-cols-2 lg:w-56 lg:grid-cols-1">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-2.5 py-1.5">
            <ThermostatIcon className="text-sky-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Sensação</p>
              <p className="text-sm font-semibold text-white">{weatherData?.main?.feels_like}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-2.5 py-1.5">
            <WaterDropIcon className="text-cyan-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Umidade</p>
              <p className="text-sm font-semibold text-white">{weatherData?.main?.humidity}%</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-5 border-t border-slate-700 pt-4">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-cyan-200/80">Previsão da semana</p>
            <p className="text-sm text-slate-400">Visão rápida dos próximos dias</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {forecastDays.map((day) => (
            <div
              key={day.day}
              className="min-w-0 rounded-2xl border border-slate-700 bg-slate-800/70 p-2.5 text-center"
            >
              <p className="text-sm font-medium capitalize text-slate-300">{day.day}</p>
              <div className="mt-3 flex justify-center text-cyan-200">
                {day.temp >= 28 ? <WbSunnyIcon fontSize="large" /> : day.temp <= 15 ? <AcUnitIcon fontSize="large" /> : <CloudIcon fontSize="large" />}
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">{day.temp}°</p>
              <p className="mt-1 line-clamp-2 text-xs text-slate-400">{day.description}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

export default MainWeather