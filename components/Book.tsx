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
  return (
    <div className="page relative bg-white rounded-lg shadow-lg">
      <div className="page-content h-[500px] w-[400px] p-4">
        <div className="page-header text-right mb-4 text-gray-400">
          Page {number}
        </div>
        <Textarea
          className="w-full h-[400px] border-none focus:outline-none resize-none bg-[#fff8e7]"
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your thoughts here..."
        />
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
    <div className="book-container flex justify-center items-center min-h-screen bg-gradient-to-r from-amber-50 to-yellow-100">
      <Card className="p-8 bg-brown-100 shadow-2xl">
        <HTMLFlipBook
          width={400}
          height={500}
          size="stretch"
          minWidth={300}
          maxWidth={400}
          minHeight={400}
          maxHeight={500}
          showCover={true}
          ref={book}
          className="book"
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
  );
};