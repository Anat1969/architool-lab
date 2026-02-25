const Topbar = () => {
  return (
    <header className="bg-ink px-6 md:px-12 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="font-mono text-[13px] tracking-[0.2em] text-paper">
        BLUE<span className="text-gold">PRINT</span>.AI
      </div>
      <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/35">
        לאדריכלים · כלי AI
      </div>
    </header>
  );
};

export default Topbar;
