import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Send, X, Clipboard } from "lucide-react";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) processFile(e.target.files[0]);
  };

  // Paste from clipboard
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) processFile(file);
        break;
      }
    }
  }, [processFile]);

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  // Drag & drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!caption && !selectedFile) return;

    const newItem: GalleryItem = {
      id: Date.now(),
      caption,
      date: new Date().toLocaleDateString("he-IL"),
      imageUrl: previewUrl || undefined,
    };

    setGallery((prev) => [newItem, ...prev]);
    setCaption("");
    clearFile();

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

  return (
    <>
      <section className="px-6 md:px-12 py-10 bg-warm-mid border-t border-grid">
        <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
          <div>
            <p className="label-mono text-gold mb-3">תרגיל — שיעור 0{lessonId}</p>
            <h2 className="text-[clamp(24px,3.2vw,34px)] font-bold leading-[1.1]">
              בנה את הסטיינג האדריכלי שלך
            </h2>
          </div>
          <p className="text-[14px] leading-[1.65] text-foreground/70 max-w-[380px]">
            השתמש בשלוש שכבות הפקדה — Settings, Project, Chat — כדי לבנות כלי עבודה אמיתי.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-grid mb-8">
          {[
            { num: "01", title: "הגדר סטיינג", desc: "כתוב 4+ הוראות ל-Settings." },
            { num: "02", title: "צור פרויקט", desc: "בחר סוג מבנה, הוסף הקשר ותקנים." },
            { num: "03", title: "בחן ותעד", desc: "שאל שאלה, צלם screenshot, תעד." },
          ].map((step) => (
            <div key={step.num} className="bg-paper p-5">
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-[12px] tracking-[0.15em] text-gold font-bold">{step.num}</span>
                <h3 className="text-[15px] font-bold">{step.title}</h3>
              </div>
              <p className="text-[13px] leading-[1.55] text-foreground/55">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-paper border border-grid p-5">
          <div className="flex items-center gap-3 mb-4">
            <p className="label-mono text-foreground/40">הגלריה — העלה עבודה</p>
            <span className="h-px flex-1 bg-grid block" />
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            {/* Upload zone with paste & drag support */}
            <div
              ref={dropZoneRef}
              className="border border-dashed border-grid p-4 text-center cursor-pointer transition-all hover:border-gold hover:bg-gold/[0.04] flex-1 min-w-[180px] relative"
              onClick={() => !previewUrl && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="תצוגה מקדימה"
                    className="w-full max-h-[120px] object-contain cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxUrl(previewUrl);
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    className="absolute top-1 left-1 bg-ink/70 text-paper w-5 h-5 flex items-center justify-center hover:bg-ink transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-gold mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-medium">העלה תמונה</p>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <Clipboard className="w-3 h-3 text-foreground/30" />
                    <p className="text-[10px] text-foreground/30">גרור, בחר, או הדבק (Ctrl+V)</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex-[2] flex flex-col gap-3">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-background border border-grid p-3 font-body text-sm text-foreground resize-none h-[80px] transition-colors focus:outline-none focus:border-gold placeholder:text-foreground/30"
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
            <div className="mt-4 p-6 text-center text-[11px] text-foreground/30 font-mono tracking-[0.1em] border-t border-grid">
              עדיין אין עבודות — היה הראשון
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[2px] bg-grid mt-4">
              {gallery.map((item) => (
                <div key={item.id} className="bg-paper overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-full aspect-[4/3] object-cover block cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setLightboxUrl(item.imageUrl!)}
                    />
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

      {/* Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[1000] bg-ink/90 flex items-center justify-center cursor-pointer"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            className="absolute top-6 left-6 text-paper/70 hover:text-paper transition-colors"
            onClick={() => setLightboxUrl(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxUrl}
            alt="תמונה מוגדלת"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-olive text-paper font-mono text-[11px] tracking-[0.15em] px-6 py-3 z-[999] transition-transform duration-300 ${showToast ? "translate-y-0" : "translate-y-20"}`}>
        העבודה הועלתה ✓
      </div>
    </>
  );
};

export default ExerciseSection;
