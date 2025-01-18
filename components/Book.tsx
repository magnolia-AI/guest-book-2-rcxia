'use client'
import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
interface PageProps {
  number: number;
  content: string;
  onChange: (content: string) => void;
}
const Page: React.FC<PageProps> = ({ number, content, onChange }) => {
  const handleTextAreaClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent page flip when clicking textarea
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    onChange(e.target.value);
  };
  return (
    <div className="page relative bg-white rounded-lg shadow-lg">
      <div className="page-content h-[500px] w-[400px] p-4">
        <div className="page-header text-right mb-4 text-gray-500 font-serif italic">
          {number}
        </div>
        <div className="page-lines h-[400px] w-full">
          <Textarea
            className="w-full h-full border-none focus:outline-none resize-none bg-[#fff8e7] font-handwriting text-lg leading-[2.5rem] tracking-wide"
            value={content}
            onChange={handleTextAreaChange}
            onClick={handleTextAreaClick}
            onMouseDown={handleTextAreaClick}
            onTouchStart={handleTextAreaClick}
            placeholder="Write your thoughts here..."
            style={{
              backgroundImage: 'repeating-linear-gradient(#fff8e7 0px, #fff8e7 24px, #e1d4b7 25px)',
              lineHeight: '25px',
              paddingTop: '4px'
            }}
          />
        </div>
        <div className="page-footer absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm italic">
          ✧ ❦ ✧
        </div>
        <div className="page-corner-right" />
        <div className="page-corner-left" />
      </div>
    </div>
  );
};
export const Book: React.FC = () => {
  const [pages, setPages] = useState<string[]>(Array(6).fill(''));
  const book = useRef(null);
  const updatePageContent = (pageIndex: number, newContent: string) => {
    const newPages = [...pages];
    newPages[pageIndex] = newContent;
    setPages(newPages);
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
            disableFlipByClick={true}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={false}
            swipeDistance={0}
            showPageCorners={true}
            onFlip={(e) => {
              // Handle page flip if needed
            }}
          >
            {pages.map((content, index) => (
              <div key={index}>
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