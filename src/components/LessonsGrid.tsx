import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
];

interface LessonsGridProps {
  activeLesson: number | null;
  onSelectLesson: (id: number) => void;
}

const LessonsGrid = ({ activeLesson, onSelectLesson }: LessonsGridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
      <div className="flex items-center justify-between mb-4">
        <p className="label-mono text-muted-alpha flex items-center gap-3">
          בחר שיעור
          <span className="h-px w-12 bg-grid block" />
        </p>
        <div className="flex gap-1">
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

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-[2px] bg-grid pb-2 scrollbar-thin scroll-smooth"
      >
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isActive={activeLesson === lesson.id}
            onClick={onSelectLesson}
          />
        ))}
      </div>
    </section>
  );
};

export default LessonsGrid;
