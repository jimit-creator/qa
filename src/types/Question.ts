export interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface FilterState {
  category: string;
  difficulty: string;
  searchTerm: string;
}