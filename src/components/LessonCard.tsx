import { Lock } from "lucide-react";

interface Lesson {
  id: number;
  number: string;
  title: string;
  description: string;
  meta: string;
  tags: string[];
  locked: boolean;
}

interface LessonCardProps {
  lesson: Lesson;
  isActive: boolean;
  onClick: (id: number) => void;
}

const LessonCard = ({ lesson, isActive, onClick }: LessonCardProps) => {
  const handleClick = () => {
    if (!lesson.locked) onClick(lesson.id);
  };

  return (
    <div
      className={`
        bg-paper p-10 relative overflow-hidden transition-all duration-300 cursor-pointer
        min-w-[320px] w-[320px] flex-shrink-0 group
        ${isActive ? "!bg-ink !text-paper" : ""}
        ${lesson.locked ? "opacity-45 !cursor-default" : ""}
        ${!lesson.locked && !isActive ? "hover:bg-warm-mid" : ""}
      `}
      onClick={handleClick}
    >
      {lesson.locked && (
        <Lock className="absolute top-9 start-9 w-4 h-4 opacity-30" />
      )}

      <p className={`font-mono text-[13px] tracking-[0.3em] mb-4 font-bold ${isActive ? "text-gold" : "text-gold"}`}>
        {lesson.number}
      </p>

      <h2
        className="font-display text-[32px] font-bold leading-[1.15] mb-3 text-foreground"
        dangerouslySetInnerHTML={{ __html: lesson.title }}
      />

      <p className={`text-[15px] leading-[1.7] mb-6 ${isActive ? "text-paper/80" : "text-foreground/70"}`}>
        {lesson.description}
      </p>

      <div className="flex justify-between items-center">
        <span className={`font-mono text-[10px] tracking-[0.15em] ${isActive ? "text-paper/40" : "text-muted-alpha"}`}>
          {lesson.meta}
        </span>
        {lesson.tags.length > 0 && (
          <div className="flex gap-1.5">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border ${
                  isActive ? "border-paper/20 text-paper/50" : "border-grid text-muted-alpha"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {!lesson.locked && (
        <button
          className={`
            mt-6 font-mono text-[10px] tracking-[0.2em] uppercase bg-gold text-ink border-none cursor-pointer
            transition-all duration-300 overflow-hidden
            ${isActive
              ? "px-5 py-2.5 max-h-12 opacity-100"
              : "px-5 py-0 max-h-0 opacity-0 group-hover:py-2.5 group-hover:max-h-12 group-hover:opacity-100"
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            onClick(lesson.id);
          }}
        >
          פתח שיעור ←
        </button>
      )}
    </div>
  );
};

export default LessonCard;
export type { Lesson };
