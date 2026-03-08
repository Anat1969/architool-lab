

## Plan: Add Lesson 06 + Remove NotebookLM References

### 1. Add Lesson 06 Slides (14 pages)

Extract 14 page screenshots from the parsed PDF and save to `src/assets/lesson06/`:
- Copy `parsed-documents://...page_1.jpg` through `page_14.jpg` to `src/assets/lesson06/`

Create `src/components/Lesson06Slides.tsx` following the same pattern as Lesson02/03/04 — import 14 images and export `lesson06Slides` array.

### 2. Update SlideViewer

- Import `lesson06Slides` from `Lesson06Slides.tsx`
- Add `lessonId === 6` to the slides conditional chain
- Update the title label for lesson 6

### 3. Update LessonsGrid

Add lesson 6 entry (skipping 5 — leaving it locked/future):
```
{
  id: 6,
  number: "שיעור 06",
  title: "דיוק והשראה<br>AI לאדריכלים",
  description: "דיוק והשראה — איך לשלב AI בתהליך התכנון האדריכלי.",
  meta: "14 שקפים · 45 דק׳",
  tags: ["AI", "Precision", "Inspiration"],
  locked: false
}
```

Also add a placeholder locked lesson 5 card to maintain order.

### 4. Remove NotebookLM References

Since the NotebookLM logo is embedded in the slide images (JPGs) and cannot be edited programmatically, I will:
- Remove "NotebookLM" from all **tags** on lesson cards in `LessonsGrid.tsx`
- Replace with more relevant tags for each lesson

### Technical Details

- 14 image assets copied to `src/assets/lesson06/`
- New component: `src/components/Lesson06Slides.tsx`
- Modified files: `SlideViewer.tsx`, `LessonsGrid.tsx`
- No new dependencies needed

