import React from 'react';
import type { Question } from '../types/Question';

interface StatsProps {
  questions: Question[];
}

const Stats: React.FC<StatsProps> = ({ questions }) => {
  const totalQuestions = questions.length;
  const categories = [...new Set(questions.map(q => q.category))];

  const stats = [
    {
      label: 'Total Questions',
      value: totalQuestions,
    },
    {
      label: 'Categories',
      value: categories.length,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg shadow p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {stat.label}
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stats;