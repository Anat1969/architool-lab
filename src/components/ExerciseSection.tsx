import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Send, X, Clipboard, UserPlus, User, Pencil } from "lucide-react";

interface ExerciseSectionProps {
  lessonId: number;
}

interface GalleryItem {
  id: number;
  imageUrl?: string;
  caption: string;
  date: string;
  studentName: string;
}

interface Student {
  id: number;
  name: string;
}

const ExerciseSection = ({ lessonId }: ExerciseSectionProps) => {
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [activeStudentFilter, setActiveStudentFilter] = useState<number | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
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

  const handleAddStudent = () => {
    const trimmed = newStudentName.trim();
    if (!trimmed) return;
    if (students.some((s) => s.name === trimmed)) return;
    const newStudent: Student = { id: Date.now(), name: trimmed };
    setStudents((prev) => [...prev, newStudent]);
    setSelectedStudentId(newStudent.id);
    setNewStudentName("");
  };

  const handleSubmit = () => {
    if (!selectedStudentId) return;
    if (!caption && !selectedFile) return;

    const student = students.find((s) => s.id === selectedStudentId);
    if (!student) return;

    const newItem: GalleryItem = {
      id: Date.now(),
      caption,
      date: new Date().toLocaleDateString("he-IL"),
      imageUrl: previewUrl || undefined,
      studentName: student.name,
    };

    setGallery((prev) => [newItem, ...prev]);
    setCaption("");
    clearFile();

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

  const startEditing = (item: GalleryItem) => {
    setEditingItemId(item.id);
    setEditCaption(item.caption);
    setEditPreviewUrl(item.imageUrl || null);
    setEditFile(null);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setEditFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setEditPreviewUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const saveEdit = () => {
    if (editingItemId === null) return;
    setGallery((prev) =>
      prev.map((item) =>
        item.id === editingItemId
          ? { ...item, caption: editCaption, imageUrl: editPreviewUrl || item.imageUrl }
          : item
      )
    );
    setEditingItemId(null);
    setEditCaption("");
    setEditPreviewUrl(null);
    setEditFile(null);
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setEditCaption("");
    setEditPreviewUrl(null);
    setEditFile(null);
  };

  const filteredGallery = activeStudentFilter
    ? gallery.filter((item) => {
        const student = students.find((s) => s.id === activeStudentFilter);
        return student && item.studentName === student.name;
      })
    : gallery;

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

        {/* Student Management */}
        <div className="bg-paper border border-grid p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <p className="label-mono text-foreground/50">ניהול סטודנטים</p>
            <span className="h-px flex-1 bg-grid block" />
          </div>

          {/* Add new student */}
          <div className="flex gap-3 mb-4 flex-wrap" dir="rtl">
            <input
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddStudent()}
              className="bg-background border border-grid px-3 py-2 text-[14px] text-foreground transition-colors focus:outline-none focus:border-gold placeholder:text-foreground/35 flex-1 min-w-[180px]"
              placeholder="הוסף שם סטודנט חדש..."
            />
            <button
              onClick={handleAddStudent}
              className="text-[12px] font-bold tracking-[0.1em] uppercase px-5 py-2 bg-gold text-ink border-none cursor-pointer transition-all hover:bg-gold/80 flex items-center gap-2"
            >
              <UserPlus className="w-3.5 h-3.5" />
              הוסף
            </button>
          </div>

          {/* Student list / filter chips */}
          {students.length > 0 && (
            <div className="flex gap-2 flex-wrap" dir="rtl">
              <button
                onClick={() => setActiveStudentFilter(null)}
                className={`text-[12px] font-semibold px-4 py-1.5 border transition-all cursor-pointer ${
                  activeStudentFilter === null
                    ? "bg-ink text-paper border-ink"
                    : "bg-transparent text-foreground/60 border-grid hover:border-foreground/30"
                }`}
              >
                הכל ({gallery.length})
              </button>
              {students.map((student) => {
                const count = gallery.filter((g) => g.studentName === student.name).length;
                return (
                  <button
                    key={student.id}
                    onClick={() =>
                      setActiveStudentFilter(
                        activeStudentFilter === student.id ? null : student.id
                      )
                    }
                    className={`text-[12px] font-semibold px-4 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeStudentFilter === student.id
                        ? "bg-ink text-paper border-ink"
                        : "bg-transparent text-foreground/60 border-grid hover:border-foreground/30"
                    }`}
                  >
                    <User className="w-3 h-3" />
                    {student.name}
                    <span className="text-[10px] opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Upload Section */}
        <div className="bg-paper border border-grid p-5">
          <div className="flex items-center gap-3 mb-4">
            <p className="label-mono text-foreground/50">הגלריה — העלה עבודה</p>
            <span className="h-px flex-1 bg-grid block" />
          </div>

          {/* Student selector for submission */}
          {students.length > 0 && (
            <div className="mb-4" dir="rtl">
              <label className="text-[12px] font-bold text-foreground/50 mb-1.5 block tracking-[0.05em]">
                בחר סטודנט
              </label>
              <select
                value={selectedStudentId ?? ""}
                onChange={(e) => setSelectedStudentId(Number(e.target.value) || null)}
                className="bg-background border border-grid px-3 py-2 text-[14px] text-foreground transition-colors focus:outline-none focus:border-gold w-full max-w-[300px]"
              >
                <option value="">— בחר סטודנט —</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {students.length === 0 && (
            <div className="mb-4 p-4 border border-dashed border-gold/30 text-center text-[13px] text-foreground/40">
              הוסף סטודנט למעלה כדי להתחיל להעלות עבודות
            </div>
          )}

          <div className="flex gap-4 flex-col md:flex-row">
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
                className="w-full bg-background border border-grid p-3 text-[14px] text-foreground resize-none h-[80px] transition-colors focus:outline-none focus:border-gold placeholder:text-foreground/35"
                placeholder="תאר בקצרה מה עשית..."
                dir="rtl"
              />
              <button
                onClick={handleSubmit}
                disabled={!selectedStudentId || (!caption && !selectedFile)}
                className="self-start text-[12px] font-bold tracking-[0.1em] uppercase px-6 py-2.5 bg-ink text-paper border-none cursor-pointer transition-all hover:bg-gold hover:text-ink flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-ink disabled:hover:text-paper"
              >
                <Send className="w-3 h-3" />
                הגש לגלריה
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredGallery.length === 0 ? (
            <div className="mt-4 p-6 text-center text-[12px] text-foreground/35 tracking-[0.08em] border-t border-grid font-medium">
              {activeStudentFilter
                ? "אין עבודות לסטודנט זה"
                : "עדיין אין עבודות — היה הראשון"}
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[2px] bg-grid mt-4">
              {filteredGallery.map((item) => (
                <div key={item.id} className="bg-paper overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-full aspect-[4/3] object-cover block cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setLightboxUrl(item.imageUrl!)}
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-warm-mid flex items-center justify-center text-[10px] tracking-[0.15em] text-grid font-medium">
                      ללא תמונה
                    </div>
                  )}
                  <div className="p-2.5 text-[11px] leading-[1.4] text-foreground/60">
                    <div className="flex items-center gap-1.5 mb-1">
                      <User className="w-3 h-3 text-gold" />
                      <strong className="text-[12px] font-bold text-foreground">{item.studentName}</strong>
                      <span className="text-[10px] text-foreground/40 mr-auto">{item.date}</span>
                    </div>
                    {item.caption && <p>{item.caption}</p>}
                  </div>
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
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-olive text-paper text-[12px] font-bold tracking-[0.1em] px-6 py-3 z-[999] transition-transform duration-300 ${showToast ? "translate-y-0" : "translate-y-20"}`}>
        העבודה הועלתה ✓
      </div>
    </>
  );
};

export default ExerciseSection;
