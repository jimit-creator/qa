import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import Stats from './components/Stats';
import QuestionList from './components/QuestionList';
import { useQuestions } from './hooks/useQuestions';
import QuestionCard from './components/QuestionCard';
import type { Question } from './types/Question';

function App() {
  const {
    questions,
    filteredQuestions,
    filters,
    setFilters,
    resetFilters,
    categories,
    difficulties,
    loading,
  } = useQuestions();

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const handleFilterChange = (newFilters: { searchTerm: string; category: string; difficulty: string }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Interview Questions</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Browse and search through our collection of interview questions</p>
        </div>

        {/* Stats */}
        <Stats questions={questions} />

        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            searchTerm={filters.searchTerm}
            category={filters.category}
            difficulty={filters.difficulty}
            categories={categories}
            difficulties={difficulties}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Questions List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-base sm:text-lg text-gray-500">No questions found matching your criteria</p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                isExpanded={selectedQuestion?.id === question.id}
                onClick={() => setSelectedQuestion(
                  selectedQuestion?.id === question.id ? null : question
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;