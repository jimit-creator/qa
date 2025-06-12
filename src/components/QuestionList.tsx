import React from 'react';
import type { Question } from '../types/Question';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  questions: Question[];
  loading?: boolean;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="p-6">
              <div className="h-6 bg-slate-200 rounded mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
                <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No questions found</h3>
        <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} isExpanded={false} onClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
      ))}
    </div>
  );
};

export default QuestionList;