const Hero = () => {
  return (
    <section className="px-6 md:px-12 pt-20 pb-16 border-b border-border relative overflow-hidden">
      {/* Background watermark */}
      <span className="absolute -right-5 -top-10 font-display text-[280px] font-black text-foreground/[0.03] pointer-events-none leading-none select-none">
        AI
      </span>

      <p className="label-mono text-gold mb-5">01 — תכנית הלימודים</p>
      <h1 className="font-display text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] mb-4">
        שיעורים
      </h1>
      <p className="text-base text-muted-alpha max-w-[520px] leading-[1.7]">
        כל שיעור מתחיל בבריף, מסתיים בכלי. לחץ על שיעור כדי לפתוח.
      </p>
    </section>
  );
};

export default Hero;
