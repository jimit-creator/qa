import { useState, useEffect, useMemo } from 'react';
import type { Question, FilterState } from '../types/Question';
import questionsData from '../data/questions.json';

// Helper function to strip HTML tags
const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const initialFilters: FilterState = {
  category: 'All',
  difficulty: 'All',
  searchTerm: '',
};

export const useQuestions = () => {
  const [questions] = useState<Question[]>(questionsData as Question[]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(questions.map(q => q.category))].sort();
  }, [questions]);

  const difficulties = useMemo(() => {
    return ['All', ...new Set(questions.map(q => q.difficulty))].sort();
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesCategory = filters.category === 'All' || question.category === filters.category;
      const matchesDifficulty = filters.difficulty === 'All' || question.difficulty === filters.difficulty;
      
      if (!matchesCategory || !matchesDifficulty) return false;
      
      if (!filters.searchTerm) return true;

      const searchTerm = filters.searchTerm.toLowerCase();
      const questionText = stripHtml(question.question).toLowerCase();
      const answerText = stripHtml(question.answer).toLowerCase();
      const categoryText = question.category.toLowerCase();

      return questionText.includes(searchTerm) || 
             answerText.includes(searchTerm) || 
             categoryText.includes(searchTerm);
    });
  }, [questions, filters]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    questions,
    filteredQuestions,
    filters,
    setFilters,
    resetFilters,
    categories,
    difficulties,
    loading,
  };
};