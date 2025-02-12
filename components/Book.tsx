'use client'
import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Card } from "@/components/ui/card";
interface PageProps {
  number: number;
  content: string;
  onChange: (content: string) => void;
}
const Page: React.FC<PageProps> = React.memo(({ number, content, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preventFlip = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  };
  return (
    <div className="demoPage">
      <div className="page-content h-[500px] w-[400px] p-4">
        <div className="page-header text-right mb-4 text-gray-500 font-serif italic">
          {number}
        </div>
        <div 
          className="page-lines h-[400px] w-full" 
          onClick={preventFlip}
          onMouseDown={preventFlip}
          onTouchStart={preventFlip}
        >
          <div 
            className="writing-container"
            onClick={preventFlip}
            onMouseDown={preventFlip}
            onTouchStart={preventFlip}
          >
            <div 
              contentEditable 
              ref={textareaRef}
              className="writing-area w-full h-full border-none focus:outline-none bg-[#fff8e7] font-handwriting text-lg leading-[2.5rem] tracking-wide overflow-auto"
              onInput={(e) => onChange(e.currentTarget.textContent || '')}
              onClick={preventFlip}
              onMouseDown={preventFlip}
              onTouchStart={preventFlip}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyDown}
              style={{
                backgroundImage: 'repeating-linear-gradient(#fff8e7 0px, #fff8e7 24px, #e1d4b7 25px)',
                lineHeight: '25px',
                paddingTop: '4px'
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
        <div className="page-footer absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm italic">
          ✧ ❦ ✧
        </div>
      </div>
    </div>
  );
});
Page.displayName = 'Page';
export const Book: React.FC = () => {
  const [pages, setPages] = useState<string[]>(Array(6).fill(''));
  const book = useRef(null);
  const updatePageContent = (pageIndex: number, newContent: string) => {
    setPages(prevPages => {
      if (prevPages[pageIndex] === newContent) return prevPages;
      const newPages = [...prevPages];
      newPages[pageIndex] = newContent;
      return newPages;
    });
  };
  return (
    <div className="book-container flex justify-center items-center min-h-screen bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-amber-100 rounded-lg blur-lg opacity-75"></div>
        <Card className="relative p-12 bg-[#8B4513] shadow-2xl rounded-lg border-4 border-[#5C3317]">
          <HTMLFlipBook
            width={400}
            height={500}
            size="stretch"
            minWidth={400}
            maxWidth={400}
            minHeight={500}
            maxHeight={500}
            showCover={true}
            ref={book}
            className="book"
            flippingTime={1000}
            usePortrait={true}
            startPage={0}
            drawShadow={true}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={false}
            swipeDistance={35}
          >
            {pages.map((content, index) => (
              <div key={index} className="page-wrapper">
                <Page
                  number={index + 1}
                  content={content}
                  onChange={(newContent) => updatePageContent(index, newContent)}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </Card>
      </div>
    </div>
  );
};