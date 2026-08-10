const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div className="flex min-h-24 flex-col justify-between rounded-xl border border-slate-700 bg-slate-800/70 p-3 text-white">
      <div className="text-sm font-medium text-slate-300">{title}</div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <Icon className="text-xl text-cyan-200" />
        <p className="text-xl font-semibold leading-none text-white">{value}</p>
      </div>
    </div>
  );
};

export default HighlightBox;