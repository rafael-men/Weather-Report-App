import { useEffect, useRef, useState } from 'react'
import FilterDramaIcon from '@mui/icons-material/FilterDrama'
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PublicIcon from '@mui/icons-material/Public'
import { getCitySuggestions, resolveCountryCapital } from '../api/weather'

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const rootRef = useRef(null)

  useEffect(() => {
    const trimmed = searchCity.trim()
    if (!trimmed) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    let cancelled = false
    // pequeno debounce pra não sair batendo na API a cada tecla
    const timer = setTimeout(async () => {
      const results = await getCitySuggestions(trimmed)
      if (cancelled) return
      setSuggestions(results)
      setIsOpen(true)
      setHighlightedIndex(-1)
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [searchCity])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const reset = () => {
    setSearchCity('')
    setSuggestions([])
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const selectSuggestion = async (suggestion) => {
    if (suggestion.kind === 'country') {
      const coords = await resolveCountryCapital(suggestion)
      onSearch({ label: suggestion.display, query: coords || suggestion.query })
    } else {
      onSearch({ label: suggestion.display, query: suggestion.query })
    }
    reset()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = searchCity.trim()
    if (!trimmed) return

    const highlighted = suggestions[highlightedIndex]
    if (highlighted) {
      selectSuggestion(highlighted)
      return
    }

    onSearch({ label: trimmed, query: trimmed })
    reset()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' && suggestions.length > 0) {
      event.preventDefault()
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp' && suggestions.length > 0) {
      event.preventDefault()
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={rootRef} className="gradient-card-wrap z-30">
      <header className="rounded-[calc(2rem-2px)] border border-white/10 bg-slate-950/35 px-4 py-4 shadow-2xl shadow-slate-950/25 backdrop-blur-xl sm:px-6">
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

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl"
          >
            <div className="relative w-full flex-1">
              <SearchIcon
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                fontSize="small"
              />
              <input
                id="city-search"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-base text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
                placeholder="ex: Tokyo, Salvador..."
                value={searchCity}
                onChange={(event) => setSearchCity(event.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
              />

              {isOpen && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-auto rounded-2xl border border-white/10 bg-slate-950/95 p-1.5 shadow-2xl shadow-slate-950/60 backdrop-blur-xl">
                  {suggestions.map((suggestion, index) => {
                    const isHighlighted = index === highlightedIndex
                    return (
                      <li key={`${suggestion.label}-${suggestion.lat}-${suggestion.lon}`}>
                        <button
                          type="button"
                          onMouseDown={(event) => {
                            event.preventDefault()
                            selectSuggestion(suggestion)
                          }}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${isHighlighted ? 'bg-cyan-400/10' : 'hover:bg-white/5'}`}
                        >
                          <span className="mt-0.5 shrink-0 text-cyan-300">
                            {suggestion.kind === 'country' ? (
                              <PublicIcon fontSize="small" />
                            ) : (
                              <LocationOnIcon fontSize="small" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-white">
                              {suggestion.name}
                              {suggestion.kind === 'country' && (
                                <span className="ml-2 text-[0.65rem] uppercase tracking-[0.2em] text-cyan-200/70">
                                  país
                                </span>
                              )}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-slate-400">
                              {suggestion.label}
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Buscar
            </button>
          </form>
        </div>
      </header>
    </div>
  )
}

export default Navbar
