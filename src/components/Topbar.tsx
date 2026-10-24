import AIMenu from "@/components/AIMenu";

const Topbar = () => {
  return (
    <header className="bg-ink px-6 md:px-12 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-[14px] font-bold tracking-[0.18em] text-paper">
        BLUE<span className="text-gold">PRINT</span>.AI
      </div>
      <div className="flex items-center gap-4">
        <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-paper/40">
          לאדריכלים · כלי AI
        </div>
        <AIMenu />
      </div>
    </header>
  );
};

export default Topbar;
