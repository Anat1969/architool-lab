import { Lock, Play } from "lucide-react";

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
        relative overflow-hidden transition-all duration-200 cursor-pointer
        min-w-[260px] w-[260px] flex-shrink-0 group
        ${isActive
          ? "bg-ink text-paper shadow-lg scale-[1.03] z-10"
          : "bg-paper hover:bg-warm-mid"
        }
        ${lesson.locked ? "opacity-40 !cursor-default" : ""}
      `}
      onClick={handleClick}
    >
      {/* Top accent bar */}
      <div className={`h-[3px] w-full ${isActive ? "bg-gold" : "bg-transparent group-hover:bg-gold/40"} transition-colors`} />

      <div className="p-5 pb-4">
        {lesson.locked && (
          <Lock className="absolute top-4 start-4 w-3.5 h-3.5 opacity-30" />
        )}

        {/* Lesson number */}
        <p className={`text-[20px] tracking-[0.08em] mb-3 font-bold text-gold`}>
          {lesson.number}
        </p>

        {/* Title */}
        <h2
          className={`text-[22px] font-bold leading-[1.2] mb-3 ${isActive ? "text-paper" : "text-foreground"}`}
          dangerouslySetInnerHTML={{ __html: lesson.title }}
        />

        {/* Meta */}
        <span className={`text-[13px] tracking-[0.05em] font-medium ${isActive ? "text-paper/60" : "text-foreground/55"}`}>
          {lesson.meta}
        </span>

        {/* Tags */}
        {lesson.tags.length > 0 && (
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[11px] tracking-[0.06em] uppercase px-2 py-1 border font-semibold ${
                  isActive ? "border-paper/20 text-paper/55" : "border-grid text-foreground/45"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action button - always visible when active, hover reveal otherwise */}
      {!lesson.locked && (
        <button
          className={`
            w-full text-[14px] tracking-[0.08em] uppercase cursor-pointer font-bold
            flex items-center justify-center gap-2 transition-all duration-200
            ${isActive
              ? "bg-gold text-ink py-3"
              : "bg-gold/0 text-gold py-0 max-h-0 opacity-0 group-hover:bg-gold group-hover:text-ink group-hover:py-3 group-hover:max-h-14 group-hover:opacity-100 overflow-hidden"
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            onClick(lesson.id);
          }}
        >
          <Play className="w-4 h-4 fill-current" />
          פתח שיעור
        </button>
      )}
    </div>
  );
};

export default LessonCard;
export type { Lesson };
