import { useState, useRef } from "react";

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
      <section className="px-6 md:px-12 py-20 bg-warm-mid border-t border-grid">
        <div className="max-w-[680px] mb-13">
          <p className="label-mono text-gold mb-4">תרגיל — שיעור 0{lessonId}</p>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.1] mb-4">
            בנה את הסטיינג<br />האדריכלי שלך
          </h2>
          <p className="text-[15px] leading-[1.75] text-body-alpha">
            הפנמת השיעור קורית ביישום. השתמש בשלוש שכבות הפקדה שלמדת —
            Settings, Project, Chat — כדי לבנות כלי עבודה אמיתי.
          </p>
        </div>

        {/* Brief Box */}
        <div className="brief-box mb-10">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold mb-3.5">הבריף</p>
          <h3 className="font-display text-[clamp(18px,2.5vw,28px)] font-medium italic leading-[1.4] mb-4 opacity-95">
            "בנה סטיינג מלא ל-Claude שיהפוך אותו למומחה אישי לאדריכלות ישראלית —
            עם הגדרות שפה, טון, ועקרונות עבודה שמשקפים את הדרך שבה אתה עובד."
          </h3>
          <p className="text-[13px] leading-[1.7] opacity-55">
            לאחר מכן — צור פרויקט ל-Claude שמתמקד בסוג מבנה אחד שאתה עובד עליו.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-grid mb-10">
          {[
            { num: "01", title: "הגדר את הסטיינג", desc: "כתוב לפחות 4 הוראות שתכניס ל-Settings של Claude." },
            { num: "02", title: "צור פרויקט", desc: "בחר סוג מבנה. בנה פרויקט Claude עם הקשר ותקנים." },
            { num: "03", title: "בחן ותעד", desc: "שאל שאלה ב-Chat. צלם screenshot. כתוב 2-3 משפטים." },
          ].map((step) => (
            <div key={step.num} className="bg-paper p-7">
              <p className="font-mono text-[10px] tracking-[0.3em] text-gold mb-2.5">{step.num}</p>
              <h3 className="text-sm font-semibold mb-1.5">{step.title}</h3>
              <p className="text-xs leading-[1.6] text-muted-alpha">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Gallery Upload */}
        <div>
          <p className="label-mono text-muted-alpha mb-5 flex items-center gap-3">
            הגלריה — העלה את העבודה שלך
            <span className="h-px flex-1 bg-grid block" />
          </p>

          <div
            className="border-[1.5px] border-dashed border-grid p-12 text-center cursor-pointer transition-all hover:border-gold hover:bg-gold/[0.04] bg-paper relative mb-7"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="font-mono text-2xl text-gold opacity-50 mb-3">⊕</div>
            <h4 className="font-display text-xl font-medium mb-1.5">
              {selectedFile ? selectedFile.name : "העלה תמונה מהתרגיל"}
            </h4>
            <p className="text-xs text-muted-alpha mb-5">Screenshot של הסטיינג, הפרויקט, או השאלה והתשובה</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {["PNG", "JPG", "Screenshot"].map((t) => (
                <span key={t} className="font-mono text-[9px] tracking-[0.15em] px-2.5 py-1 bg-warm-mid text-muted-alpha">{t}</span>
              ))}
            </div>
          </div>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full bg-paper border border-grid p-4 font-body text-sm font-light text-foreground resize-y min-h-[100px] mb-4 transition-colors focus:outline-none focus:border-gold placeholder:text-muted-alpha"
            placeholder="תאר בקצרה מה עשית: מה הסטיינג שבנית? מה הפרויקט שיצרת? מה הרגשת שהשתנה בתוצאות?"
            dir="rtl"
          />

          <button
            onClick={handleSubmit}
            className="font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 bg-ink text-paper border-none cursor-pointer transition-all hover:bg-gold hover:text-ink"
          >
            הגש לגלריה ←
          </button>

          {/* Gallery Grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[2px] bg-grid mt-6">
            {gallery.length === 0 ? (
              <div className="col-span-full p-13 text-center text-[13px] text-muted-alpha font-mono tracking-[0.1em]">
                עדיין אין עבודות בגלריה — היה הראשון
              </div>
            ) : (
              gallery.map((item) => (
                <div key={item.id} className="bg-paper overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="w-full aspect-[4/3] object-cover block bg-warm-mid" />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-warm-mid flex items-center justify-center font-mono text-[10px] tracking-[0.2em] text-grid">
                      ללא תמונה
                    </div>
                  )}
                  {item.caption && (
                    <div className="p-3.5 text-xs leading-[1.5] text-foreground/60">
                      <strong className="block text-xs font-semibold text-foreground mb-0.5">{item.date}</strong>
                      {item.caption}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-olive text-white font-mono text-[11px] tracking-[0.15em] px-6 py-3 z-[999] transition-transform duration-300 ${showToast ? "translate-y-0" : "translate-y-20"}`}>
        העבודה הועלתה לגלריה ✓
      </div>
    </>
  );
};

export default ExerciseSection;
