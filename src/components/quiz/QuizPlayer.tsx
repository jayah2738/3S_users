'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  question: string;
  type: string;
  options: Option[];
  points: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
}

export default function QuizPlayer({ quizId }: { quizId: string }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (quiz?.timeLimit) {
      setTimeLeft(quiz.timeLimit * 60);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quiz]);

  const fetchQuiz = async () => {
    try {
      const res = await fetch(`/api/quiz/${quizId}`);
      const data = await res.json();
      setQuiz(data);
      setAnswers(new Array(data.questions.length).fill(null));
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleAnswer = (answer: any) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = {
        quizId,
        answers: answers.map((answer, index) => ({
          questionId: quiz!.questions[index]._id,
          answer,
          isCorrect: calculateIsCorrect(quiz!.questions[index], answer),
          points: calculatePoints(quiz!.questions[index], answer),
        })),
        score: calculateTotalScore(),
        timeTaken: quiz!.timeLimit * 60 - timeLeft,
      };

      await fetch('/api/quiz/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      });

      router.push(`/quiz/result/${quizId}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setIsSubmitting(false);
    }
  };

  const calculateIsCorrect = (question: Question, answer: any) => {
    if (question.type === 'multiple_choice' || question.type === 'true_false') {
      return question.options.find((o) => o.isCorrect)?.text === answer;
    }
    return null; // For short answer questions, manual grading required
  };

  const calculatePoints = (question: Question, answer: any) => {
    if (calculateIsCorrect(question, answer)) {
      return question.points;
    }
    return 0;
  };

  const calculateTotalScore = () => {
    return answers.reduce((total, answer, index) => {
      return total + calculatePoints(quiz!.questions[index], answer);
    }, 0);
  };

  if (!quiz) return <div>Loading...</div>;

  const question = quiz.questions[currentQuestion];
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{quiz.title}</h1>
          <div className="text-lg font-medium">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
            <div className="text-sm text-gray-500">
              Points: {question.points}
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-medium">{question.question}</h2>

          {question.type === 'short_answer' ? (
            <textarea
              value={answers[currentQuestion] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              placeholder="Enter your answer..."
            />
          ) : (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3"
                >
                  <input
                    type={
                      question.type === 'multiple_choice' ? 'radio' : 'checkbox'
                    }
                    id={`option-${index}`}
                    name={`question-${currentQuestion}`}
                    checked={answers[currentQuestion] === option.text}
                    onChange={() => handleAnswer(option.text)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="text-gray-700"
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-md text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestion === quiz.questions.length - 1}
            className={`px-4 py-2 rounded-md text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            Next
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-md text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
} 