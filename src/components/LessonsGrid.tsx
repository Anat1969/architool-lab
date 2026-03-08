import { useRef, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import LessonCard from "./LessonCard";
import type { Lesson } from "./LessonCard";

const lessons: Lesson[] = [
  {
    id: 1,
    number: "שיעור 01",
    title: "שליטה מוחלטת ב-AI<br>שלוש רמות דיוק",
    description: "רוב האנשים עובדים רק ברמת הצ'אט — ומפספסים 70% מהפוטנציאל.",
    meta: "14 שקפים · 40 דק׳",
    tags: ["Settings", "Project", "Chat"],
    locked: false,
  },
  {
    id: 2,
    number: "שיעור 02",
    title: "ממשקים<br>Revit API + AI",
    description: "חיבור כלי AI לסביבת העבודה האדריכלית.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Revit", "API"],
    locked: false,
  },
  {
    id: 3,
    number: "שיעור 03",
    title: "כלי, שותף, בקרה<br>מחקר עם AI",
    description: "איך להפוך AI לשותף מחקר אמיתי.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Research", "AI"],
    locked: false,
  },
  {
    id: 4,
    number: "שיעור 04",
    title: "ארכיטקטורת ידע<br>טיפולוגיות",
    description: "בניית ארכיטקטורת ידע עם AI.",
    meta: "30 שקפים · 90 דק׳",
    tags: ["Typologies", "Systems"],
    locked: false,
  },
  {
    id: 5,
    number: "שיעור 05",
    title: "בקרוב",
    description: "שיעור זה יפורסם בקרוב.",
    meta: "—",
    tags: [],
    locked: true,
  },
  {
    id: 6,
    number: "שיעור 06",
    title: "דיוק והשראה<br>AI לאדריכלים",
    description: "דיוק והשראה בתהליך התכנון.",
    meta: "14 שקפים · 45 דק׳",
    tags: ["Precision", "Inspiration"],
    locked: false,
  },
  {
    id: 7,
    number: "שיעור 07",
    title: "מעבר לשאלה הנכונה<br>חשיבה עם AI",
    description: "שיטות לעבודה עמוקה עם AI.",
    meta: "14 שקפים · 45 דק׳",
    tags: ["Thinking", "AI"],
    locked: false,
  },
  {
    id: 8,
    number: "שיעור 08",
    title: "דפוסים עירוניים<br>ניתוח עם AI",
    description: "ניתוח מרקמים עירוניים בעזרת AI.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Urban", "Patterns"],
    locked: false,
  },
  {
    id: 9,
    number: "שיעור 09",
    title: "תבניות ונכסים דיגיטליים<br>AI Templates",
    description: "בניית Templates חכמים עם AI.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Templates", "Workflow"],
    locked: false,
  },
  {
    id: 10,
    number: "שיעור 10",
    title: "בניית נכסים דיגיטליים<br>עם AI",
    description: "בניית נכסים דיגיטליים וכלי עבודה עם AI.",
    meta: "13 שקפים · 45 דק׳",
    tags: ["Assets", "Digital", "AI"],
    locked: false,
  },
];

interface LessonsGridProps {
  activeLesson: number | null;
  onSelectLesson: (id: number) => void;
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ");

const LessonsGrid = ({ activeLesson, onSelectLesson }: LessonsGridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return lessons;
    const q = searchQuery.trim().toLowerCase();
    return lessons.filter(
      (l) =>
        l.number.toLowerCase().includes(q) ||
        stripHtml(l.title).toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 420;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 md:px-12 py-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <p className="text-[17px] font-bold text-foreground/75 flex items-center gap-3">
          בחר שיעור
          <span className="h-px w-12 bg-grid block" />
        </p>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חפש שיעור..."
              className="bg-warm-mid border border-grid text-foreground text-[14px] pr-9 pl-8 py-2 w-[220px] focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 placeholder:text-foreground/35 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Scroll buttons */}
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 flex items-center justify-center bg-warm-mid hover:bg-gold hover:text-ink text-foreground/50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 flex items-center justify-center bg-warm-mid hover:bg-gold hover:text-ink text-foreground/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lessons scroll row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-[2px] bg-grid pb-2 scrollbar-thin scroll-smooth"
      >
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isActive={activeLesson === lesson.id}
              onClick={onSelectLesson}
            />
          ))
        ) : (
          <div className="w-full py-12 text-center">
            <p className="text-[18px] font-bold text-foreground/45">
              לא נמצאו שיעורים עבור "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-[13px] font-medium text-gold hover:underline"
            >
              נקה חיפוש
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LessonsGrid;
