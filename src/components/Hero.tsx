const Hero = () => {
  return (
    <section className="px-6 md:px-12 pt-14 pb-8 relative overflow-hidden">
      <span className="absolute -right-5 -top-10 text-[200px] font-black text-foreground/[0.03] pointer-events-none leading-none select-none">
        AI
      </span>

      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="label-mono text-gold mb-3">01 — תכנית הלימודים</p>
          <h1 className="text-[clamp(36px,5.5vw,56px)] font-black leading-[1.05] tracking-tight">
            שיעורים
          </h1>
        </div>
        <p className="text-[18px] font-medium text-foreground/75 max-w-[420px] leading-[1.65] pb-1">
          כל שיעור מתחיל בבריף, מסתיים בכלי. לחץ על שיעור כדי לפתוח.
        </p>
      </div>
    </section>
  );
};

export default Hero;
