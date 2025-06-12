export const getCategoryColor = (category: string) => {
  const colors: { [key: string]: { bg: string; text: string } } = {
    'JavaScript': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'React': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'TypeScript': { bg: 'bg-purple-100', text: 'text-purple-800' },
    'Database': { bg: 'bg-green-100', text: 'text-green-800' },
    'Git': { bg: 'bg-orange-100', text: 'text-orange-800' },
    'CSS': { bg: 'bg-pink-100', text: 'text-pink-800' },
    'Node.js': { bg: 'bg-emerald-100', text: 'text-emerald-800' },
    'General': { bg: 'bg-gray-100', text: 'text-gray-800' },
    'Angular': { bg: 'bg-red-100', text: 'text-red-800' },
    'AWS': { bg: 'bg-amber-100', text: 'text-amber-800' }
  };
  return colors[category] || { bg: 'bg-slate-100', text: 'text-slate-800' };
};

export const getDifficultyColor = (difficulty: string) => {
  const colors: { [key: string]: { bg: string; text: string } } = {
    'Beginner': { bg: 'bg-green-100', text: 'text-green-800' },
    'Intermediate': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'Advanced': { bg: 'bg-red-100', text: 'text-red-800' }
  };
  return colors[difficulty] || { bg: 'bg-slate-100', text: 'text-slate-800' };
}; 