const Hero = () => {
  return (
    <section className="px-6 md:px-12 pt-14 pb-8 relative overflow-hidden">
      <span className="absolute -right-5 -top-10 font-display text-[200px] font-black text-foreground/[0.03] pointer-events-none leading-none select-none">
        AI
      </span>

      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="label-mono text-gold mb-2">01 — תכנית הלימודים</p>
          <h1 className="font-display text-[clamp(32px,5vw,52px)] font-bold leading-[1.05]">
            שיעורים
          </h1>
        </div>
        <p className="text-sm text-muted-alpha max-w-[400px] leading-[1.6] pb-1">
          כל שיעור מתחיל בבריף, מסתיים בכלי. לחץ פעמיים על שיעור כדי לפתוח.
        </p>
      </div>
    </section>
  );
};

export default Hero;
