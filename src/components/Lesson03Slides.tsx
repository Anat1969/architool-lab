import page1 from "@/assets/lesson03/page_1.jpg";
import page2 from "@/assets/lesson03/page_2.jpg";
import page3 from "@/assets/lesson03/page_3.jpg";
import page4 from "@/assets/lesson03/page_4.jpg";
import page5 from "@/assets/lesson03/page_5.jpg";
import page6 from "@/assets/lesson03/page_6.jpg";
import page7 from "@/assets/lesson03/page_7.jpg";
import page8 from "@/assets/lesson03/page_8.jpg";
import page9 from "@/assets/lesson03/page_9.jpg";
import page10 from "@/assets/lesson03/page_10.jpg";
import page11 from "@/assets/lesson03/page_11.jpg";
import page12 from "@/assets/lesson03/page_12.jpg";
import page13 from "@/assets/lesson03/page_13.jpg";
import page14 from "@/assets/lesson03/page_14.jpg";
import page15 from "@/assets/lesson03/page_15.jpg";

const pages = [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11, page12, page13, page14, page15];

export const lesson03Slides = pages.map((src, i) => ({
  id: i + 1,
  content: (
    <div className="w-full h-full flex items-center justify-center">
      <img src={src} alt={`שקף ${i + 1}`} className="w-full h-full object-contain" />
    </div>
  ),
}));
