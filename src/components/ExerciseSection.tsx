import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Upload, Send, X, Clipboard, UserPlus, User, Pencil, Play, FileText, HelpCircle, ChevronDown, ChevronUp, CheckCircle2, BookOpen } from "lucide-react";
import { getExerciseData } from "@/data/exerciseData";

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

  // Step completion & reflection
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [showReflection, setShowReflection] = useState<Record<string, boolean>>({});

  // Expandable sections
  const [showExample, setShowExample] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  // Recording URL editing
  const [recordingUrl, setRecordingUrl] = useState<string>("");
  const [isEditingRecording, setIsEditingRecording] = useState(false);
  const [tempRecordingUrl, setTempRecordingUrl] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`recording-url-${lessonId}`);
    setRecordingUrl(saved || "");
    setIsEditingRecording(false);
  }, [lessonId]);

  const saveRecordingUrl = () => {
    const url = tempRecordingUrl.trim();
    if (url) {
      localStorage.setItem(`recording-url-${lessonId}`, url);
      setRecordingUrl(url);
    } else {
      localStorage.removeItem(`recording-url-${lessonId}`);
      setRecordingUrl("");
    }
    setIsEditingRecording(false);
  };

  const startEditingRecording = () => {
    setTempRecordingUrl(recordingUrl || exercise.recordingUrl || "");
    setIsEditingRecording(true);
  };

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

  const toggleStepComplete = (stepNum: string) => {
    setCompletedSteps((prev) => {
      const newState = { ...prev, [stepNum]: !prev[stepNum] };
      if (newState[stepNum]) {
        setShowReflection((r) => ({ ...r, [stepNum]: true }));
      }
      return newState;
    });
  };

  const exercise = useMemo(() => getExerciseData(lessonId), [lessonId]);
  const lessonLabel = lessonId < 10 ? `0${lessonId}` : `${lessonId}`;

  return (
    <>
      <section className="px-6 md:px-12 py-10 bg-warm-mid border-t border-grid" dir="rtl">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8 flex-wrap">
          <div>
            <p className="label-mono text-gold mb-3">תרגיל — שיעור {lessonLabel}</p>
            <h2 className="text-[clamp(28px,3.5vw,40px)] font-black leading-[1.1] text-foreground">
              {exercise.title}
            </h2>
          </div>
          <p className="text-[16px] leading-[1.7] text-foreground/75 max-w-[420px]">
            {exercise.description}
          </p>
        </div>

        {/* Resources bar: recording, example, links */}
        <div className="flex flex-wrap gap-3 mb-8">
          {exercise.recordingUrl && (
            <a
              href={exercise.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-ink text-paper px-5 py-2.5 text-[14px] font-bold hover:bg-gold hover:text-ink transition-colors"
            >
              <Play className="w-4 h-4" />
              צפה בהקלטת ההרצאה
            </a>
          )}
          {exercise.exampleSolution && (
            <button
              onClick={() => setShowExample(!showExample)}
              className="flex items-center gap-2 bg-paper border border-grid text-foreground px-5 py-2.5 text-[14px] font-bold hover:border-gold transition-colors"
            >
              <BookOpen className="w-4 h-4 text-gold" />
              דוגמה לפתרון מלא
              {showExample ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
          {exercise.faq.length > 0 && (
            <button
              onClick={() => setShowFaq(!showFaq)}
              className="flex items-center gap-2 bg-paper border border-grid text-foreground px-5 py-2.5 text-[14px] font-bold hover:border-gold transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-gold" />
              שאלות ותשובות ({exercise.faq.length})
              {showFaq ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Example solution expandable */}
        {showExample && exercise.exampleSolution && (
          <div className="bg-ink text-paper p-6 mb-8 border-r-4 border-gold">
            <p className="label-mono text-gold mb-3">דוגמה לפתרון</p>
            <p className="text-[15px] leading-[1.8] text-paper/85">{exercise.exampleSolution}</p>
          </div>
        )}

        {/* FAQ expandable */}
        {showFaq && exercise.faq.length > 0 && (
          <div className="bg-paper border border-grid p-6 mb-8 space-y-4">
            <p className="label-mono text-gold mb-2">שאלות ותשובות</p>
            {exercise.faq.map((item, i) => (
              <div key={i} className="border-b border-grid pb-4 last:border-0 last:pb-0">
                <p className="text-[16px] font-bold text-foreground mb-1.5 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  {item.question}
                </p>
                <p className="text-[15px] leading-[1.7] text-foreground/70 pr-6">{item.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-grid mb-8">
          {exercise.steps.map((step) => {
            const isComplete = completedSteps[step.num];
            const showRef = showReflection[step.num];
            return (
              <div key={step.num} className={`bg-paper p-6 flex flex-col ${isComplete ? 'ring-2 ring-olive/30' : ''}`}>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[14px] tracking-[0.15em] text-gold font-bold">{step.num}</span>
                  <h3 className="text-[18px] font-bold text-foreground">{step.title}</h3>
                </div>
                <p className="text-[15px] leading-[1.65] text-foreground/60 mb-3">{step.desc}</p>

                {/* Deliverable */}
                <div className="bg-warm-mid/60 border-r-3 border-gold p-3 mb-4 mt-auto">
                  <p className="text-[12px] font-bold text-gold tracking-[0.1em] uppercase mb-1">תוצר מצופה</p>
                  <p className="text-[14px] leading-[1.6] text-foreground/80">{step.deliverable}</p>
                </div>

                {/* Complete button */}
                <button
                  onClick={() => toggleStepComplete(step.num)}
                  className={`flex items-center gap-2 text-[14px] font-bold px-4 py-2 transition-colors self-start ${
                    isComplete
                      ? 'bg-olive text-paper'
                      : 'bg-transparent border border-grid text-foreground/50 hover:border-gold hover:text-foreground'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isComplete ? 'בוצע ✓' : 'סמן כבוצע'}
                </button>

                {/* Reflection field */}
                {isComplete && showRef && (
                  <div className="mt-4 pt-4 border-t border-grid">
                    <label className="text-[13px] font-bold text-foreground/60 mb-2 block">
                      רפלקציה — מה עבד? מה לא עבד?
                    </label>
                    <textarea
                      value={reflections[step.num] || ""}
                      onChange={(e) => setReflections((prev) => ({ ...prev, [step.num]: e.target.value }))}
                      className="w-full bg-background border border-grid p-3 text-[14px] text-foreground resize-none h-[80px] transition-colors focus:outline-none focus:border-gold placeholder:text-foreground/35"
                      placeholder="תעד את התהליך: מה למדת, מה הפתיע, מה תשנה בפעם הבאה..."
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Student Management */}
        <div className="bg-paper border border-grid p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <p className="label-mono text-foreground/50">ניהול סטודנטים</p>
            <span className="h-px flex-1 bg-grid block" />
          </div>

          <div className="flex gap-3 mb-4 flex-wrap">
            <input
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddStudent()}
              className="bg-background border border-grid px-3 py-2.5 text-[15px] text-foreground transition-colors focus:outline-none focus:border-gold placeholder:text-foreground/35 flex-1 min-w-[180px]"
              placeholder="הוסף שם סטודנט חדש..."
            />
            <button
              onClick={handleAddStudent}
              className="text-[13px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 bg-gold text-ink border-none cursor-pointer transition-all hover:bg-gold/80 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              הוסף
            </button>
          </div>

          {students.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveStudentFilter(null)}
                className={`text-[13px] font-semibold px-4 py-2 border transition-all cursor-pointer ${
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
                    className={`text-[13px] font-semibold px-4 py-2 border transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeStudentFilter === student.id
                        ? "bg-ink text-paper border-ink"
                        : "bg-transparent text-foreground/60 border-grid hover:border-foreground/30"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    {student.name}
                    <span className="text-[11px] opacity-60">({count})</span>
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

          {students.length > 0 && (
            <div className="mb-4">
              <label className="text-[13px] font-bold text-foreground/50 mb-1.5 block tracking-[0.05em]">
                בחר סטודנט
              </label>
              <select
                value={selectedStudentId ?? ""}
                onChange={(e) => setSelectedStudentId(Number(e.target.value) || null)}
                className="bg-background border border-grid px-3 py-2.5 text-[15px] text-foreground transition-colors focus:outline-none focus:border-gold w-full max-w-[300px]"
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
            <div className="mb-4 p-4 border border-dashed border-gold/30 text-center text-[14px] text-foreground/40">
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
                  <p className="text-[14px] font-medium">העלה תמונה</p>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <Clipboard className="w-3 h-3 text-foreground/30" />
                    <p className="text-[11px] text-foreground/30">גרור, בחר, או הדבק (Ctrl+V)</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex-[2] flex flex-col gap-3">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-background border border-grid p-3 text-[15px] text-foreground resize-none h-[80px] transition-colors focus:outline-none focus:border-gold placeholder:text-foreground/35"
                placeholder="תאר בקצרה מה עשית..."
              />
              <button
                onClick={handleSubmit}
                disabled={!selectedStudentId || (!caption && !selectedFile)}
                className="self-start text-[13px] font-bold tracking-[0.1em] uppercase px-6 py-2.5 bg-ink text-paper border-none cursor-pointer transition-all hover:bg-gold hover:text-ink flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-ink disabled:hover:text-paper"
              >
                <Send className="w-3.5 h-3.5" />
                הגש לגלריה
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredGallery.length === 0 ? (
            <div className="mt-4 p-6 text-center text-[13px] text-foreground/35 tracking-[0.08em] border-t border-grid font-medium">
              {activeStudentFilter
                ? "אין עבודות לסטודנט זה"
                : "עדיין אין עבודות — היה הראשון"}
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[2px] bg-grid mt-4">
              {filteredGallery.map((item) => (
                <div key={item.id} className="bg-paper overflow-hidden relative group">
                  {editingItemId === item.id ? (
                    <div className="p-3 flex flex-col gap-3">
                      <input
                        ref={editFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleEditFileChange}
                        className="hidden"
                      />
                      {editPreviewUrl ? (
                        <div className="relative">
                          <img
                            src={editPreviewUrl}
                            alt=""
                            className="w-full aspect-[4/3] object-cover block"
                          />
                          <button
                            onClick={() => editFileInputRef.current?.click()}
                            className="absolute bottom-2 right-2 bg-ink/70 text-paper text-[11px] font-bold px-2 py-1 flex items-center gap-1 hover:bg-ink transition-colors"
                          >
                            <Pencil className="w-3 h-3" />
                            החלף
                          </button>
                        </div>
                      ) : (
                        <div
                          className="w-full aspect-[4/3] bg-warm-mid flex items-center justify-center cursor-pointer hover:bg-gold/10 transition-colors border border-dashed border-grid"
                          onClick={() => editFileInputRef.current?.click()}
                        >
                          <Upload className="w-4 h-4 text-foreground/30" />
                        </div>
                      )}
                      <textarea
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        className="w-full bg-background border border-grid p-2 text-[14px] text-foreground resize-none h-[60px] focus:outline-none focus:border-gold"
                        placeholder="תיאור..."
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="text-[12px] font-bold px-3 py-1.5 bg-ink text-paper hover:bg-gold hover:text-ink transition-colors flex-1"
                        >
                          שמור
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-[12px] font-bold px-3 py-1.5 bg-transparent border border-grid text-foreground/60 hover:border-foreground/40 transition-colors flex-1"
                        >
                          ביטול
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative cursor-pointer" onClick={() => startEditing(item)}>
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="w-full aspect-[4/3] object-cover block hover:opacity-90 transition-opacity"
                          />
                        ) : (
                          <div className="w-full aspect-[4/3] bg-warm-mid flex items-center justify-center text-[11px] tracking-[0.15em] text-grid font-medium">
                            ללא תמונה
                          </div>
                        )}
                        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors flex items-center justify-center">
                          <Pencil className="w-5 h-5 text-paper opacity-0 group-hover:opacity-90 transition-opacity drop-shadow-md" />
                        </div>
                      </div>
                      <div className="p-3 text-[12px] leading-[1.4] text-foreground/60 cursor-pointer" onClick={() => startEditing(item)}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <User className="w-3.5 h-3.5 text-gold" />
                          <strong className="text-[13px] font-bold text-foreground">{item.studentName}</strong>
                          <span className="text-[11px] text-foreground/40 mr-auto">{item.date}</span>
                        </div>
                        {item.caption && <p>{item.caption}</p>}
                      </div>
                    </>
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
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-olive text-paper text-[13px] font-bold tracking-[0.1em] px-6 py-3 z-[999] transition-transform duration-300 ${showToast ? "translate-y-0" : "translate-y-20"}`}>
        העבודה הועלתה ✓
      </div>
    </>
  );
};

export default ExerciseSection;
