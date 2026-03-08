import LessonCard from "./LessonCard";
import type { Lesson } from "./LessonCard";

const lessons: Lesson[] = [
  {
    id: 1,
    number: "שיעור 01",
    title: "שליטה מוחלטת ב-AI<br>שלוש רמות דיוק",
    description: "רוב האנשים עובדים רק ברמת הצ'אט — ומפספסים 70% מהפוטנציאל. שלוש שכבות הפקדה שהופכות את Claude למומחה אישי.",
    meta: "14 שקפים · 40 דק׳",
    tags: ["Settings", "Project", "Chat"],
    locked: false,
  },
  {
    id: 2,
    number: "שיעור 02",
    title: "ממשקים<br>Revit API + AI",
    description: "חיבור כלי AI לסביבת העבודה האדריכלית שלך.",
    meta: "15 שקפים · 45 דק׳",
    tags: ["NotebookLM", "Revit", "API"],
    locked: false,
  },
  {
    id: 3,
    number: "שיעור 03",
    title: "ראייה ממוחשבת<br>קריאת תכניות",
    description: "AI שמבין תכניות קומה ומזהה אלמנטים אדריכליים.",
    meta: "בקרוב",
    tags: [],
    locked: true,
  },
];

interface LessonsGridProps {
  activeLesson: number | null;
  onSelectLesson: (id: number) => void;
}

const LessonsGrid = ({ activeLesson, onSelectLesson }: LessonsGridProps) => {
  return (
    <section className="px-6 md:px-12 py-16">
      <p className="label-mono text-muted-alpha mb-9 flex items-center gap-3">
        בחר שיעור
        <span className="h-px w-20 bg-grid block" />
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[2px] bg-grid">
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
