import page1 from "@/assets/lesson06/page_1.jpg";
import page2 from "@/assets/lesson06/page_2.jpg";
import page3 from "@/assets/lesson06/page_3.jpg";
import page4 from "@/assets/lesson06/page_4.jpg";
import page5 from "@/assets/lesson06/page_5.jpg";
import page6 from "@/assets/lesson06/page_6.jpg";
import page7 from "@/assets/lesson06/page_7.jpg";
import page8 from "@/assets/lesson06/page_8.jpg";
import page9 from "@/assets/lesson06/page_9.jpg";
import page10 from "@/assets/lesson06/page_10.jpg";
import page11 from "@/assets/lesson06/page_11.jpg";
import page12 from "@/assets/lesson06/page_12.jpg";
import page13 from "@/assets/lesson06/page_13.jpg";
import page14 from "@/assets/lesson06/page_14.jpg";

const pages = [
  page1, page2, page3, page4, page5, page6, page7,
  page8, page9, page10, page11, page12, page13, page14,
];

// Slides 2-14 are mirrored from the source PDF extraction
const mirroredSlides = new Set([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

export const lesson06Slides = pages.map((src, i) => ({
  id: i + 1,
  content: (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <img
        src={src}
        alt={`שקף ${i + 1}`}
        className="w-full h-full object-contain"
        style={mirroredSlides.has(i + 1) ? { transform: "scaleX(-1)" } : undefined}
      />
      {/* Cover NotebookLM logo - bottom-left for mirrored slides, bottom-right for normal */}
      <div
        className="absolute"
        style={{
          bottom: "2%",
          right: mirroredSlides.has(i + 1) ? "2%" : undefined,
          left: mirroredSlides.has(i + 1) ? undefined : "2%",
          width: "120px",
          height: "28px",
          backgroundColor: "hsl(38 38% 93%)",
        }}
      />
    </div>
  ),
}));
