import { useState } from 'react'
import FilterDramaIcon from '@mui/icons-material/FilterDrama';

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (searchCity.trim()) {
      onSearch(searchCity.trim())
      setSearchCity('')
    }
  }

  return (
    <header className="rounded-[2rem] border border-white/10 bg-slate-950/35 px-4 py-4 shadow-2xl shadow-slate-950/25 backdrop-blur-xl sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200 shadow-lg shadow-cyan-950/25">
            <FilterDramaIcon fontSize="medium" />
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-cyan-200/70">
              Weather App
            </p>
            <p className="text-2xl font-semibold text-white">Previsão do tempo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
          <label className="sr-only" htmlFor="city-search">
            Buscar cidade
          </label>
          <input
            id="city-search"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
            placeholder="ex: Tokyo"
            value={searchCity}
            onChange={(event) => setSearchCity(event.target.value)}
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Buscar
          </button>
        </form>
      </div>
    </header>
  )
}

export default Navbar
