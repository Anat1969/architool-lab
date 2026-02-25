import { useState, useRef, useEffect } from "react";
import Topbar from "@/components/Topbar";
import Hero from "@/components/Hero";
import LessonsGrid from "@/components/LessonsGrid";
import SlideViewer from "@/components/SlideViewer";
import ExerciseSection from "@/components/ExerciseSection";

const Index = () => {
  const [activeLesson, setActiveLesson] = useState<number | null>(1);
  const [openViewer, setOpenViewer] = useState<number | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleSelectLesson = (id: number) => {
    if (activeLesson === id) {
      setOpenViewer(id);
    } else {
      setActiveLesson(id);
    }
  };

  useEffect(() => {
    if (openViewer && viewerRef.current) {
      setTimeout(() => {
        viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [openViewer]);

  return (
    <div className="min-h-screen">
      <Topbar />
      <Hero />
      <LessonsGrid activeLesson={activeLesson} onSelectLesson={handleSelectLesson} />

      {openViewer && (
        <div ref={viewerRef}>
          <SlideViewer lessonId={openViewer} onClose={() => setOpenViewer(null)} />
          <ExerciseSection lessonId={openViewer} />
        </div>
      )}
    </div>
  );
};

export default Index;
