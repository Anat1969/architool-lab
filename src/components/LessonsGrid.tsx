import { useRef, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import LessonCard from "./LessonCard";
import type { Lesson } from "./LessonCard";

const lessons: Lesson[] = [
  {
    id: 1,
    number: "שיעור 01",
    title: "שליטה מיטבית ב-AI<br>שלוש רמות דיוק",
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
  {
    id: 11,
    number: "שיעור 11",
    title: "תהליך מקצועי עם AI<br>מבנה ופרמטרים",
    description: "בניית תהליך עבודה מקצועי עם AI — הפרדה בין מבנה לפרמטרים.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Workflow", "AI", "Parameters"],
    locked: false,
  },
  {
    id: 12,
    number: "שיעור 12",
    title: "NotebookLM<br>מחקר מתקדם",
    description: "מחקר מתקדם עם NotebookLM ו-AI.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["NotebookLM", "Research"],
    locked: false,
  },
  {
    id: 13,
    number: "שיעור 13",
    title: "סיכום ומבט קדימה<br>AI לאדריכלים",
    description: "סיכום הקורס ומבט על העתיד של AI בתכנון.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Summary", "Future"],
    locked: false,
  },
  {
    id: 14,
    number: "שיעור 14",
    title: "NotebookLM<br>מעשי לאדריכלים",
    description: "יישום מעשי של NotebookLM בעבודה אדריכלית.",
    meta: "14 שקפים · 45 דק׳",
    tags: ["NotebookLM", "Practical"],
    locked: false,
  },
  {
    id: 15,
    number: "שיעור 15",
    title: "תרגול מעשי<br>AI לאדריכלים",
    description: "תרגול מעשי ויישום כלי AI בעבודה אדריכלית.",
    meta: "12 שקפים · 45 דק׳",
    tags: ["Practice", "AI"],
    locked: false,
  },
  {
    id: 16,
    number: "שיעור 16",
    title: "DNA אדריכלי<br>עם NotebookLM",
    description: "בניית DNA אדריכלי אישי עם NotebookLM ו-Claude.",
    meta: "13 שקפים · 45 דק׳",
    tags: ["NotebookLM", "DNA", "Claude"],
    locked: false,
  },
  {
    id: 17,
    number: "שיעור 17",
    title: "ניהול ידע מעשי<br>AI לאדריכלים",
    description: "ניהול ידע מעשי וארגון מידע אדריכלי עם AI.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Knowledge", "Management", "AI"],
    locked: false,
  },
  {
    id: 18,
    number: "שיעור 18",
    title: "סדנת DNA אדריכלי<br>יישום מעשי",
    description: "סדנה מעשית ליישום DNA אדריכלי עם כלי AI.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Workshop", "DNA", "AI"],
    locked: false,
  },
  {
    id: 19,
    number: "שיעור 19",
    title: "ניתוח מרחבי<br>AI וגיאוגרפיה",
    description: "ניתוח מרחבי וגיאוגרפי עם כלי AI לאדריכלים.",
    meta: "18 שקפים · 45 דק׳",
    tags: ["Spatial", "GIS", "AI"],
    locked: false,
  },
  {
    id: 20,
    number: "שיעור 20",
    title: "NotebookLM מתקדם<br>טיפולוגיות אדריכליות",
    description: "שימוש מתקדם ב-NotebookLM לניתוח טיפולוגיות אדריכליות.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["NotebookLM", "Typologies"],
    locked: false,
  },
  {
    id: 21,
    number: "שיעור 21",
    title: "אדריכלות ו-AI<br>תכנון מתקדם",
    description: "תכנון אדריכלי מתקדם עם כלי AI וניתוח טיפולוגי.",
    meta: "12 שקפים · 45 דק׳",
    tags: ["Architecture", "Planning", "AI"],
    locked: false,
  },
  {
    id: 22,
    number: "שיעור 22",
    title: "אסטרטגיות AI<br>לאדריכלים מתקדמים",
    description: "אסטרטגיות עבודה מתקדמות עם AI בתכנון אדריכלי.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Strategy", "Advanced", "AI"],
    locked: false,
  },
  {
    id: 23,
    number: "שיעור 23",
    title: "פרקטיקה מקצועית<br>AI בתכנון",
    description: "יישום פרקטי של AI בתהליכי תכנון ואדריכלות.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["Practice", "Design", "AI"],
    locked: false,
  },
  {
    id: 30,
    number: "שיעור 30",
    title: "NotebookLM<br>Assistant ו-Knowledge",
    description: "עבודה עם Assistant ו-Knowledge ב-NotebookLM לאדריכלים.",
    meta: "14 שקפים · 45 דק׳",
    tags: ["NotebookLM", "Assistant", "Knowledge"],
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
