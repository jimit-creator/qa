import React from 'react';
import type { Question } from '../types/Question';
import { getCategoryColor, getDifficultyColor } from '../utils/colors';

interface QuestionCardProps {
  question: Question & { displayNumber?: number };
  isExpanded: boolean;
  onClick: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, isExpanded, onClick }) => {
  const categoryColors = getCategoryColor(question.category);
  const difficultyColors = getDifficultyColor(question.difficulty);

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100 cursor-pointer hover:border-slate-200 transition-colors"
      onClick={onClick}
    >
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium text-sm">
              {question.displayNumber}
            </div>
            <h3 
              className="text-base sm:text-lg font-medium text-slate-900 prose prose-slate max-w-none
                prose-headings:text-slate-900 
                prose-p:text-slate-700 
                prose-strong:text-slate-900 
                prose-code:bg-slate-100 
                prose-code:px-1.5 
                prose-code:py-0.5 
                prose-code:rounded 
                prose-code:text-slate-900 
                prose-pre:bg-slate-900 
                prose-pre:text-slate-100 
                prose-pre:rounded-lg 
                prose-pre:p-3 
                prose-pre:overflow-x-auto 
                prose-ul:list-disc 
                prose-ul:pl-5 
                prose-ul:text-slate-700
                prose-li:text-slate-700
                prose-li:my-1.5"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
          </div>
          <div className="flex-shrink-0">
            <svg 
              className={`w-5 h-5 text-slate-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {isExpanded && (
          <div 
            className="prose prose-slate max-w-none mt-4 sm:mt-6 text-sm sm:text-base
              prose-headings:text-slate-900 
              prose-p:text-slate-700 
              prose-strong:text-slate-900 
              prose-code:bg-slate-100 
              prose-code:px-1.5 
              prose-code:py-0.5 
              prose-code:rounded 
              prose-code:text-slate-900 
              prose-pre:bg-slate-900 
              prose-pre:text-slate-100 
              prose-pre:rounded-lg 
              prose-pre:p-3 
              prose-pre:overflow-x-auto 
              prose-ul:list-disc 
              prose-ul:pl-5 
              prose-ul:text-slate-700
              prose-li:text-slate-700
              prose-li:my-1.5"
            dangerouslySetInnerHTML={{ __html: question.answer }}
          />
        )}
        
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors.bg} ${categoryColors.text}`}>
            {question.category}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors.bg} ${difficultyColors.text}`}>
            {question.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;