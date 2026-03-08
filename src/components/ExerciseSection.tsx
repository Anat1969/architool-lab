import { useState, useRef } from "react";
import { Upload, Send } from "lucide-react";

interface ExerciseSectionProps {
  lessonId: number;
}

interface GalleryItem {
  id: number;
  imageUrl?: string;
  caption: string;
  date: string;
}

const ExerciseSection = ({ lessonId }: ExerciseSectionProps) => {
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!caption && !selectedFile) return;

    const newItem: GalleryItem = {
      id: Date.now(),
      caption,
      date: new Date().toLocaleDateString("he-IL"),
    };

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newItem.imageUrl = e.target?.result as string;
        setGallery((prev) => [newItem, ...prev]);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setGallery((prev) => [newItem, ...prev]);
    }

    setCaption("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

  return (
    <>
      <section className="px-6 md:px-12 py-10 bg-warm-mid border-t border-grid">
        {/* Header - compact */}
        <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
          <div>
            <p className="label-mono text-gold mb-2">תרגיל — שיעור 0{lessonId}</p>
            <h2 className="font-display text-[clamp(22px,3vw,32px)] font-bold leading-[1.1]">
              בנה את הסטיינג האדריכלי שלך
            </h2>
          </div>
          <p className="text-[13px] leading-[1.6] text-body-alpha max-w-[360px]">
            השתמש בשלוש שכבות הפקדה — Settings, Project, Chat — כדי לבנות כלי עבודה אמיתי.
          </p>
        </div>

        {/* Steps - horizontal compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-grid mb-8">
          {[
            { num: "01", title: "הגדר סטיינג", desc: "כתוב 4+ הוראות ל-Settings." },
            { num: "02", title: "צור פרויקט", desc: "בחר סוג מבנה, הוסף הקשר ותקנים." },
            { num: "03", title: "בחן ותעד", desc: "שאל שאלה, צלם screenshot, תעד." },
          ].map((step) => (
            <div key={step.num} className="bg-paper p-5">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold font-bold">{step.num}</span>
                <h3 className="text-sm font-semibold">{step.title}</h3>
              </div>
              <p className="text-xs leading-[1.5] text-muted-alpha">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Upload area - compact */}
        <div className="bg-paper border border-grid p-5">
          <div className="flex items-center gap-3 mb-4">
            <p className="label-mono text-muted-alpha">הגלריה — העלה עבודה</p>
            <span className="h-px flex-1 bg-grid block" />
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            {/* Upload + textarea side by side */}
            <div
              className="border border-dashed border-grid p-6 text-center cursor-pointer transition-all hover:border-gold hover:bg-gold/[0.04] flex-1 min-w-[180px]"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-5 h-5 text-gold mx-auto mb-2 opacity-60" />
              <p className="text-sm font-medium">
                {selectedFile ? selectedFile.name : "העלה תמונה"}
              </p>
              <p className="text-[10px] text-muted-alpha mt-1">PNG · JPG · Screenshot</p>
            </div>

            <div className="flex-[2] flex flex-col gap-3">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-background border border-grid p-3 font-body text-sm text-foreground resize-none h-[80px] transition-colors focus:outline-none focus:border-gold placeholder:text-muted-alpha"
                placeholder="תאר בקצרה מה עשית..."
                dir="rtl"
              />
              <button
                onClick={handleSubmit}
                className="self-start font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-2.5 bg-ink text-paper border-none cursor-pointer transition-all hover:bg-gold hover:text-ink flex items-center gap-2 font-bold"
              >
                <Send className="w-3 h-3" />
                הגש לגלריה
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          {gallery.length === 0 ? (
            <div className="mt-4 p-6 text-center text-[11px] text-muted-alpha font-mono tracking-[0.1em] border-t border-grid">
              עדיין אין עבודות — היה הראשון
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[2px] bg-grid mt-4">
              {gallery.map((item) => (
                <div key={item.id} className="bg-paper overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="w-full aspect-[4/3] object-cover block" />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-warm-mid flex items-center justify-center font-mono text-[9px] tracking-[0.2em] text-grid">
                      ללא תמונה
                    </div>
                  )}
                  {item.caption && (
                    <div className="p-2.5 text-[11px] leading-[1.4] text-foreground/60">
                      <strong className="block text-[11px] font-semibold text-foreground mb-0.5">{item.date}</strong>
                      {item.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-olive text-paper font-mono text-[11px] tracking-[0.15em] px-6 py-3 z-[999] transition-transform duration-300 ${showToast ? "translate-y-0" : "translate-y-20"}`}>
        העבודה הועלתה ✓
      </div>
    </>
  );
};

export default ExerciseSection;
