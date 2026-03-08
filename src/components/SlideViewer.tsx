import { useState, useCallback } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { lesson02Slides } from "./Lesson02Slides";
import { lesson03Slides } from "./Lesson03Slides";
import { lesson04Slides } from "./Lesson04Slides";
import { lesson06Slides } from "./Lesson06Slides";
import { lesson07Slides } from "./Lesson07Slides";
import { lesson08Slides } from "./Lesson08Slides";
import { lesson09Slides } from "./Lesson09Slides";
import { lesson10Slides } from "./Lesson10Slides";
import { lesson12Slides } from "./Lesson12Slides";
import { lesson13Slides } from "./Lesson13Slides";
import { lesson14Slides } from "./Lesson14Slides";
import { lesson15Slides } from "./Lesson15Slides";
import { lesson16Slides } from "./Lesson16Slides";

interface Slide {
  id: number;
  content: React.ReactNode;
}

// Slide data for Lesson 01
const lesson01Slides: Slide[] = [
  {
    id: 1,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <svg className="w-[min(240px,30%)] mb-[5%]" viewBox="0 0 200 200" fill="none">
          <path d="M100 100 C80 60, 140 40, 120 80 C100 120, 60 90, 80 130 C100 170, 150 140, 130 100 C110 60, 70 70, 90 110 C110 150, 160 120, 140 80 C120 40, 80 50, 100 100Z" stroke="hsl(20 15% 10%)" strokeWidth="1.5" fill="none" opacity="0.7"/>
          <path d="M100 100 Q130 70 150 100 Q170 130 140 150 Q110 170 90 140 Q70 110 100 100Z" stroke="hsl(20 15% 10%)" strokeWidth="1" fill="none" opacity="0.5"/>
          <line x1="145" y1="110" x2="200" y2="110" stroke="hsl(36 44% 50%)" strokeWidth="1.5"/>
        </svg>
        <h1 className="font-display text-[clamp(28px,5vw,60px)] font-black leading-none mb-[2%]">
          הסוד לתשובות<br/>מדויקות
        </h1>
        <p className="text-[clamp(12px,1.5vw,18px)] text-muted-alpha">
          כיצד להפוך את Claude מעוזר כללי למומחה אישי<br/>בעזרת שלוש רמות בקרה.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex gap-[5%] h-full items-center flex-col md:flex-row">
        <div className="flex-shrink-0 md:w-[40%]">
          <h2 className="font-display text-[clamp(18px,2.8vw,36px)] font-bold leading-[1.1] mb-[3%]">
            אם אתם מקבלים תשובות בינוניות, אתם לא לבד.
          </h2>
          <p className="text-[clamp(10px,1.2vw,14px)] leading-[1.7] text-body-alpha mt-[3%]">
            אתם שואלים שאלה, מקבלים תשובה. לפעמים היא טובה, לפעמים פחות. הבעיה היא לא בכלי, אלא בשיטה.
          </p>
          <div className="font-display text-[clamp(32px,5vw,64px)] font-black text-gold leading-none mt-[6%]">70%</div>
          <div className="text-[clamp(11px,1.3vw,15px)] text-muted-alpha">מהפוטנציאל לא ממומש</div>
        </div>
        <div className="flex-1 flex justify-center">
          <svg className="w-full max-w-[280px]" viewBox="0 0 300 400" fill="none">
            <polygon points="150,20 220,140 80,140" fill="hsl(38 25% 87%)" stroke="hsl(20 15% 10%)" strokeWidth="1.5"/>
            <text x="150" y="95" textAnchor="middle" fontFamily="Rubik" fontSize="14" fill="hsl(20 15% 10%)">צ'אט</text>
            <line x1="0" y1="155" x2="300" y2="155" stroke="hsl(36 44% 50%)" strokeWidth="1"/>
            <polygon points="80,155 220,155 260,380 40,380" fill="hsl(36 44% 50%)" opacity="0.7"/>
            <text x="150" y="260" textAnchor="middle" fontFamily="Rubik" fontWeight="bold" fontSize="22" fill="white">70%</text>
            <text x="150" y="285" textAnchor="middle" fontFamily="Rubik" fontSize="12" fill="rgba(255,255,255,0.8)">מהפוטנציאל</text>
            <text x="150" y="302" textAnchor="middle" fontFamily="Rubik" fontSize="12" fill="rgba(255,255,255,0.8)">לא ממומש</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-[clamp(20px,3.5vw,42px)] font-bold mb-[2%]">הפתרון: מערכת בקרה משולשת</h2>
        <p className="text-[clamp(10px,1.3vw,15px)] text-body-alpha max-w-[70%] leading-[1.7] mb-[5%]">
          התשובה שאתם מקבלים נקבעת לא רק על ידי השאלה האחרונה. היא תוצר של שלוש רמות היררכיות.
        </p>
        <div className="flex flex-col gap-[2%] max-w-[600px]">
          <div className="bg-[#e8dcc0] p-[3%_5%] font-display text-[clamp(14px,2vw,24px)] font-medium flex items-center gap-3">⚙ סטיינג (Settings)</div>
          <div className="bg-[#c8d4b8] p-[3%_5%] font-display text-[clamp(14px,2vw,24px)] font-medium flex items-center gap-3">📋 פרויקט (Project)</div>
          <div className="bg-[#ddc0b4] p-[3%_5%] font-display text-[clamp(14px,2vw,24px)] font-medium flex items-center gap-3">💬 צ'אט (Chat)</div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-[clamp(20px,3.5vw,42px)] font-bold mb-[4%]">בואו נדמיין שאתם נכנסים למסעדת שף.</h2>
        <p className="text-[clamp(11px,1.4vw,17px)] leading-[1.75] text-body-alpha max-w-[65%]">
          קבלת תשובה מעולה מ-AI דומה להזמנת מנה מושלמת. ההצלחה לא תלויה רק בכמה שלוקח את ההזמנה, אלא במטבח, בתפריט, ובבקשה הספציפית שלכם.
        </p>
        <div className="gold-box mt-[4%] max-w-[700px]">
          <div className="box-label">העיקרון</div>
          <p className="font-display text-[clamp(14px,2vw,24px)] font-medium leading-[1.3]">
            מטבח + תפריט + הזמנה = המנה המושלמת שלך
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-[clamp(20px,3vw,38px)] font-black mb-1">הרמה הראשונה:<br/>הסטיינג — המטבח שלכם</h2>
        <p className="text-[clamp(10px,1.3vw,15px)] text-body-alpha max-w-[55%] leading-[1.7] mb-[4%]">
          הסטיינג הוא הפילטר הקבוע שעובר על כל שיחה.
        </p>
        <div className="flex flex-col gap-[2%] max-w-[600px]">
          {["השפה שלכם: עברית, אנגלית וכו'.", "הטון שלכם: פורמלי, ישיר, יצירתי.", "המבנה המועדף: פסקאות, רשימות, דוגמאות.", "העקרונות שלכם: \"תמיד סנתז את הבקשה לפני שתענה\"."].map((item, i) => (
            <div key={i} className="flex gap-3 items-start text-[clamp(10px,1.3vw,15px)] leading-[1.5] text-foreground/70">
              <span className="text-olive text-[clamp(10px,1.2vw,14px)] mt-0.5 shrink-0">✓</span>
              <div dangerouslySetInnerHTML={{ __html: `<strong class="font-semibold text-foreground">${item.split(":")[0]}:</strong>${item.split(":").slice(1).join(":")}` }} />
            </div>
          ))}
        </div>
        <div className="gold-box mt-[5%] max-w-[700px]">
          <div className="box-label">כלל הזהב</div>
          <p className="font-display text-[clamp(14px,2vw,24px)] font-medium leading-[1.3]">
            אם זה נכון תמיד, לכל שיחה ובכל הקשר — זה שייך לסטיינג.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-[clamp(20px,3vw,38px)] font-black mb-1">הרמה השנייה:<br/>הפרויקט — התפריט המקצועי</h2>
        <p className="text-[clamp(10px,1.3vw,15px)] text-body-alpha max-w-[58%] leading-[1.7] mb-[4%]">
          הפרויקט הוא הסביבה הספציפית של העבודה שלכם.
        </p>
        <div className="flex flex-col gap-[2%] max-w-[620px]">
          {["תחום העבודה: 'אתה עוזר לי בתכנון אדריכלי של מבני ציבור'.", "מסמכי רקע: תקנים, חומרי עזר, קבצים רלוונטיים.", "הגדרות ייחודיות: 'בפרויקט זה, תמיד התייחס לתקן ישראלי 1142'.", "שפה מקצועית: 'השתמש במינוח אדריכלי מדויק'."].map((item, i) => (
            <div key={i} className="flex gap-3 items-start text-[clamp(10px,1.3vw,15px)] leading-[1.5] text-foreground/70">
              <span className="text-olive text-[clamp(10px,1.2vw,14px)] mt-0.5 shrink-0">✓</span>
              <div dangerouslySetInnerHTML={{ __html: `<strong class="font-semibold text-foreground">${item.split(":")[0]}:</strong>${item.split(":").slice(1).join(":")}` }} />
            </div>
          ))}
        </div>
        <div className="gold-box mt-[4%] max-w-[700px]">
          <div className="box-label">כלל הזהב</div>
          <p className="font-display text-[clamp(14px,2vw,24px)] font-medium leading-[1.3]">
            אם זה נכון רק לסוג עבודה מסויים — זה שייך לפרויקט.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-[clamp(20px,3vw,38px)] font-black mb-1">הרמה השלישית:<br/>הצ'אט — ההזמנה הנקודתית</h2>
        <p className="text-[clamp(10px,1.3vw,15px)] text-body-alpha max-w-[58%] leading-[1.7] mb-[4%]">
          הצ'אט הוא השאלה הספציפית שלכם, כאן ועכשיו.
        </p>
        <div className="gold-box max-w-[700px]">
          <div className="box-label">כלל הזהב</div>
          <p className="font-display text-[clamp(14px,2vw,24px)] font-medium leading-[1.3]">
            אם זה נכון רק עכשיו, לשאלה הזאת — זה נשאר בצ'אט.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    content: (
      <div className="flex flex-col justify-center h-full items-center">
        <h2 className="font-display text-[clamp(18px,3vw,36px)] font-bold mb-[5%] text-center">הסינתזה: כך נוצרת תשובה מושלמת</h2>
        <div className="flex flex-col w-full max-w-[500px] mx-auto">
          <div className="p-[3%_5%] text-[clamp(10px,1.3vw,15px)] leading-[1.5] text-center">
            <span className="opacity-60 text-[clamp(9px,1.1vw,12px)]">משתמש שואל:</span>{" "}
            <strong className="text-[clamp(10px,1.2vw,14px)]">"עזור לי לתכנן כיתה לבית ספר."</strong>
          </div>
          <div className="text-center text-[clamp(10px,1.5vw,18px)] text-gold py-[0.5%]">↓</div>
          <div className="bg-[#e8dcc0] p-[3%_5%] text-[clamp(10px,1.3vw,15px)]"><strong>פילטר סטיינג:</strong> ענה בעברית, התחל בסינתזה, כתוב בפסקאות.</div>
          <div className="text-center text-[clamp(10px,1.5vw,18px)] text-gold py-[0.5%]">↓</div>
          <div className="bg-[#c8d4b8] p-[3%_5%] text-[clamp(10px,1.3vw,15px)]"><strong>הקשר פרויקט:</strong> תכנון בתי ספר, תקן 1142, ילדים גילאי 6-12.</div>
          <div className="text-center text-[clamp(10px,1.5vw,18px)] text-gold py-[0.5%]">↓</div>
          <div className="bg-[#ddc0b4] p-[3%_5%] text-[clamp(10px,1.3vw,15px)]"><strong>מיקוד צ'אט:</strong> תכנון כיתה (לא מסדרון, לא חצר).</div>
          <div className="text-center text-[clamp(10px,1.5vw,18px)] text-gold py-[0.5%]">↓</div>
          <div className="bg-warm-mid p-[3%_5%] border border-grid text-[clamp(10px,1.2vw,14px)]">
            <strong>התוצאה:</strong> תשובה מדויקת ומותאמת אישית.
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    content: (
      <div className="h-full flex flex-col overflow-hidden p-0">
        <div className="p-[4%_7%] border-b border-grid">
          <h2 className="font-display text-[clamp(18px,3vw,36px)] font-bold">ההבדל בין חובבן למקצוען</h2>
        </div>
        <div className="flex flex-col md:flex-row flex-1 gap-px bg-grid">
          <div className="flex-1 bg-paper p-[5%] flex flex-col border-e-[3px] border-gold">
            <h3 className="font-display text-[clamp(14px,2vw,22px)] font-bold mb-[4%]">אחרי — עבודה עם שלוש רמות</h3>
            <div className="bg-warm-mid rounded-none rounded-tl-xl rounded-tr-xl rounded-bl-xl p-[4%] text-[clamp(10px,1.2vw,14px)] leading-[1.6] flex-1">
              "בהתבסס על ההקשר של תכנון בתי ספר, הנה הצעה לתכנון כיתה העומדת בתקן ישראלי 1142..."
            </div>
            <p className="text-[clamp(10px,1.1vw,13px)] text-muted-alpha mt-[4%]">תוצאה: דייק, חיסכון בזמן, תוצאות מותאמות אישית.</p>
          </div>
          <div className="flex-1 bg-paper p-[5%] flex flex-col">
            <h3 className="font-display text-[clamp(14px,2vw,22px)] font-bold mb-[4%]">לפני — עבודה בצ'אט בלבד</h3>
            <div className="bg-warm-mid rounded-none rounded-tl-xl rounded-tr-xl rounded-bl-xl p-[4%] text-[clamp(10px,1.2vw,14px)] leading-[1.6] flex-1">
              "איזה סוג בניין? לאיזה גיל הילדים? על איזה תקן אתה מסתמך?"
            </div>
            <p className="text-[clamp(10px,1.1vw,13px)] text-muted-alpha mt-[4%]">תוצאה: תסכול, בזבוז זמן, תוצאות גנריות.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-[clamp(20px,3.5vw,44px)] font-bold mb-[4%]">הטעות הגדולה שרוב האנשים עושים</h2>
        <p className="font-display text-[clamp(20px,3vw,38px)] font-bold text-rust mb-[4%]">
          הם עובדים רק ברמת הצ'אט.
        </p>
        <p className="text-[clamp(11px,1.4vw,16px)] text-body-alpha max-w-[65%] leading-[1.75]">
          הם מכניסים את כל ההקשר לתוך השאלה, פעם אחר פעם. ותוהים מדוע התשובות לא עקביות.
        </p>
      </div>
    ),
  },
  {
    id: 11,
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="font-display text-[clamp(18px,3vw,38px)] font-bold mb-[2%]">
          המטבח, התפריט, ההזמנה:<br/>המודל החדש שלכם
        </h2>
        <p className="text-[clamp(10px,1.3vw,15px)] text-body-alpha max-w-[60%] leading-[1.7] mb-[5%]">
          הפסיקו לעבוד קשה. התחילו לעבוד חכם.
        </p>
        <div className="flex flex-col gap-[2%] max-w-[500px]">
          <div className="bg-[#e8dcc0] p-[3%_5%] font-display text-[clamp(14px,2vw,24px)] font-medium"><strong>סטיינג</strong> — מה שנכון תמיד</div>
          <div className="bg-[#c8d4b8] p-[3%_5%] font-display text-[clamp(14px,2vw,24px)] font-medium"><strong>פרויקט</strong> — מה שנכון לסוג העבודה</div>
          <div className="bg-[#ddc0b4] p-[3%_5%] font-display text-[clamp(14px,2vw,24px)] font-medium"><strong>צ'אט</strong> — מה שנכון עכשיו</div>
        </div>
        <p className="font-display text-[clamp(13px,1.8vw,22px)] font-bold mt-[5%]">
          אתם לא רק חוסכים זמן — אתם מקבלים תשובות שבאמת מותאמות לאופן שבו אתם עובדים.
        </p>
      </div>
    ),
  },
];

interface SlideViewerProps {
  lessonId: number;
  onClose: () => void;
}

const SlideViewer = ({ lessonId, onClose }: SlideViewerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = lessonId === 1 ? lesson01Slides : lessonId === 2 ? lesson02Slides : lessonId === 3 ? lesson03Slides : lessonId === 4 ? lesson04Slides : lessonId === 6 ? lesson06Slides : lessonId === 7 ? lesson07Slides : lessonId === 8 ? lesson08Slides : lessonId === 9 ? lesson09Slides : lessonId === 10 ? lesson10Slides : lessonId === 12 ? lesson12Slides : lessonId === 13 ? lesson13Slides : lessonId === 14 ? lesson14Slides : lessonId === 15 ? lesson15Slides : lessonId === 16 ? lesson16Slides : [];
  const total = slides.length;

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < total) setCurrentSlide(index);
  }, [total]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") goTo(currentSlide + 1);
    if (e.key === "ArrowRight" || e.key === "ArrowUp") goTo(currentSlide - 1);
    if (e.key === "Escape") onClose();
  }, [currentSlide, goTo, onClose]);

  if (slides.length === 0) return null;

  return (
    <div className="bg-[#111] border-t-[3px] border-gold" tabIndex={0} onKeyDown={handleKeyDown}>
      {/* Viewer topbar */}
      <div className="bg-black/80 px-6 md:px-12 py-4 flex justify-between items-center border-b border-white/[0.06] sticky top-[53px] z-[100]">
        <span className="text-[18px] font-bold tracking-wide text-white/90">
          {lessonId === 1 ? "שיעור 01 — שליטה מוחלטת ב-AI" : lessonId === 6 ? "שיעור 06 — דיוק והשראה" : lessonId === 7 ? "שיעור 07 — מעבר לשאלה הנכונה" : lessonId === 8 ? "שיעור 08 — דפוסים עירוניים" : lessonId === 9 ? "שיעור 09 — תבניות ונכסים דיגיטליים" : `שיעור 0${lessonId}`}
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => goTo(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="bg-white/[0.1] border border-white/15 text-white text-[15px] font-bold px-5 py-2.5 cursor-pointer transition-all hover:bg-gold hover:text-ink hover:border-gold disabled:opacity-20 disabled:cursor-default tracking-[0.05em]"
          >
            <ChevronRight className="w-4 h-4 inline mr-1" /> הקודם
          </button>
          <span className="text-[16px] font-bold text-white/60 min-w-[70px] text-center">
            {currentSlide + 1} / {total}
          </span>
          <button
            onClick={() => goTo(currentSlide + 1)}
            disabled={currentSlide === total - 1}
            className="bg-gold border border-gold text-ink text-[15px] font-bold px-5 py-2.5 cursor-pointer transition-all hover:bg-gold/80 disabled:opacity-20 disabled:cursor-default tracking-[0.05em]"
          >
            הבא <ChevronLeft className="w-4 h-4 inline ml-1" />
          </button>
          <button
            onClick={onClose}
            className="bg-transparent border border-white/20 text-white/70 text-[14px] font-bold tracking-[0.08em] px-4 py-2.5 cursor-pointer transition-all hover:text-white hover:border-white/50 hover:bg-white/10"
          >
            סגור <X className="w-4 h-4 inline" />
          </button>
        </div>
      </div>

      {/* Slide canvas */}
      <div className="w-full h-[calc(100vh-53px-56px-32px)] bg-paper flex items-center justify-center overflow-hidden relative">
        <div className="w-full h-full p-[6%_7%] relative bg-paper flex flex-col">
          {slides[currentSlide].content}
          <span className="absolute bottom-[3%] start-[4%] text-[clamp(8px,0.8vw,10px)] text-foreground/25 tracking-[0.08em] font-medium">
            BLUEPRINT.AI — שיעור 0{lessonId}
          </span>
        </div>
      </div>

      {/* Dots */}
      <div className="bg-[#111] px-6 md:px-12 py-3 flex gap-1.5 items-center flex-wrap">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all shrink-0 ${
              i === currentSlide ? "bg-gold scale-[1.4]" : "bg-white/15 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideViewer;
