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
  const [filters, setFilters] = useState<FilterState>(() => {
    // Get category from URL on initial load
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get('category');
    return {
      ...initialFilters,
      category: categoryFromUrl || 'All',
    };
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get('page')) || 1;
    return page;
  });
  const [pageSize, setPageSize] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const size = Number(params.get('pageSize')) || 10;
    return size;
  });

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Update URL when filters, page, or pageSize changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Update category
    if (filters.category === 'All') {
      params.delete('category');
    } else {
      params.set('category', filters.category);
    }

    // Update pagination
    if (currentPage === 1) {
      params.delete('page');
    } else {
      params.set('page', currentPage.toString());
    }

    if (pageSize === 10) {
      params.delete('pageSize');
    } else {
      params.set('pageSize', pageSize.toString());
    }

    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [filters.category, currentPage, pageSize]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.category, filters.difficulty, filters.searchTerm]);

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredQuestions.length / pageSize);
  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredQuestions.slice(startIndex, startIndex + pageSize).map((question, index) => ({
      ...question,
      displayNumber: startIndex + index + 1
    }));
  }, [filteredQuestions, currentPage, pageSize]);

  const resetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  return {
    questions,
    filteredQuestions: paginatedQuestions,
    totalQuestions: filteredQuestions.length,
    filters,
    setFilters,
    resetFilters,
    categories,
    difficulties,
    loading,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
  };
};