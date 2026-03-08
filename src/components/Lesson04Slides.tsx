import page1 from "@/assets/lesson04/page_1.jpg";
import page2 from "@/assets/lesson04/page_2.jpg";
import page3 from "@/assets/lesson04/page_3.jpg";
import page4 from "@/assets/lesson04/page_4.jpg";
import page5 from "@/assets/lesson04/page_5.jpg";
import page6 from "@/assets/lesson04/page_6.jpg";
import page7 from "@/assets/lesson04/page_7.jpg";
import page8 from "@/assets/lesson04/page_8.jpg";
import page9 from "@/assets/lesson04/page_9.jpg";
import page10 from "@/assets/lesson04/page_10.jpg";
import page11 from "@/assets/lesson04/page_11.jpg";
import page12 from "@/assets/lesson04/page_12.jpg";
import page13 from "@/assets/lesson04/page_13.jpg";
import page14 from "@/assets/lesson04/page_14.jpg";
import page15 from "@/assets/lesson04/page_15.jpg";

import pageB1 from "@/assets/lesson04b/page_1.jpg";
import pageB2 from "@/assets/lesson04b/page_2.jpg";
import pageB3 from "@/assets/lesson04b/page_3.jpg";
import pageB4 from "@/assets/lesson04b/page_4.jpg";
import pageB5 from "@/assets/lesson04b/page_5.jpg";
import pageB6 from "@/assets/lesson04b/page_6.jpg";
import pageB7 from "@/assets/lesson04b/page_7.jpg";
import pageB8 from "@/assets/lesson04b/page_8.jpg";
import pageB9 from "@/assets/lesson04b/page_9.jpg";
import pageB10 from "@/assets/lesson04b/page_10.jpg";
import pageB11 from "@/assets/lesson04b/page_11.jpg";
import pageB12 from "@/assets/lesson04b/page_12.jpg";
import pageB13 from "@/assets/lesson04b/page_13.jpg";
import pageB14 from "@/assets/lesson04b/page_14.jpg";
import pageB15 from "@/assets/lesson04b/page_15.jpg";

const pages = [
  page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11, page12, page13, page14, page15,
  pageB1, pageB2, pageB3, pageB4, pageB5, pageB6, pageB7, pageB8, pageB9, pageB10, pageB11, pageB12, pageB13, pageB14, pageB15,
];

export const lesson04Slides = pages.map((src, i) => ({
  id: i + 1,
  content: (
    <div className="w-full h-full flex items-center justify-center">
      <img src={src} alt={`שקף ${i + 1}`} className="w-full h-full object-contain" />
    </div>
  ),
}));
