
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CompressIcon from '@mui/icons-material/Compress'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import HighlightBox from './HighlightBox'

const TodayHighlights = ({ weatherData }) => {
  const { main, visibility, sys } = weatherData

  const highlights = [
    { title: 'Umidade', value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: 'Pressão', value: `${main.pressure} hPa`, Icon: CompressIcon },
    {
      title: 'Visibilidade',
      value: `${(visibility / 1000).toFixed(1)} km`,
      Icon: VisibilityIcon,
    },
    { title: 'Sensação', value: `${main.feels_like}°C`, Icon: DeviceThermostatIcon },
  ]

  return (
    <aside className="flex h-full flex-col rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/20 sm:p-5">
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
          <p className="text-sm font-medium text-cyan-200/80">Nascer do sol e pôr do sol</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/5 p-3 text-center">
              <WbSunnyIcon className="text-2xl text-amber-300" />
              <p className="mt-2 text-xl font-semibold text-white">
                {new Date(sys.sunrise * 1000).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="mt-0.5 text-xs text-slate-300">Nascer</p>
            </div>

            <div className="rounded-xl bg-white/5 p-3 text-center">
              <NightsStayIcon className="text-2xl text-sky-300" />
              <p className="mt-2 text-xl font-semibold text-white">
                {new Date(sys.sunset * 1000).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="mt-0.5 text-xs text-slate-300">Pôr do sol</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-cyan-200/80">Destaques do dia</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <HighlightBox
                key={highlight.title}
                title={highlight.title}
                value={highlight.value}
                Icon={highlight.Icon}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default TodayHighlights