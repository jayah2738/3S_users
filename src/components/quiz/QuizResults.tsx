'use client';

import { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface QuizResult {
  _id: string;
  quizId: {
    title: string;
    passingScore: number;
  };
  score: number;
  answers: {
    questionId: string;
    answer: string;
    isCorrect: boolean;
    points: number;
  }[];
  timeTaken: number;
  submittedAt: string;
}

export default function QuizResults({ resultId }: { resultId: string }) {
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    fetchResult();
  }, [resultId]);

  const fetchResult = async () => {
    try {
      const res = await fetch(`/api/quiz/result/${resultId}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching quiz result:', error);
    }
  };

  if (!result) return <div>Loading...</div>;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const isPassing = result.score >= result.quizId.passingScore;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            {result.quizId.title} - Results
          </h1>
          <div className="text-lg">
            Score:{' '}
            <span
              className={`font-bold ${
                isPassing ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {result.score}%
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Time taken: {formatTime(result.timeTaken)}
          </div>
        </div>

        <div className="space-y-6">
          {result.answers.map((answer, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${
                answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">Question {index + 1}</div>
                  <div className="text-gray-600">Your answer: {answer.answer}</div>
                </div>
                <div className="flex items-center">
                  {answer.isCorrect ? (
                    <FiCheckCircle className="text-green-500 text-xl" />
                  ) : (
                    <FiXCircle className="text-red-500 text-xl" />
                  )}
                  <span className="ml-2 text-sm">
                    {answer.points} points
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div
            className={`text-lg font-medium ${
              isPassing ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPassing ? 'Congratulations! You passed!' : 'Keep practicing!'}
          </div>
          <div className="text-sm text-gray-500">
            Passing score: {result.quizId.passingScore}%
          </div>
        </div>
      </div>
    </div>
  );
} 