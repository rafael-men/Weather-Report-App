const Footer = () => {
  return (
    <footer className="pb-2 pt-1 text-center text-sm text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p>Desenvolvido por Rafael</p>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p>Versão: <span className="font-semibold">{import.meta.env.VITE_APP_VERSION}</span></p>
      </div>
    </footer>
  );
};

export default Footer;
