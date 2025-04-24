'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
    return null;
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
    <div className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-xl bg-white/20 p-6 backdrop-blur-xl dark:bg-gray-dark/20"
        >
          {/* Header */}
          <div className="mb-8 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-semibold text-black dark:text-white"
            >
              {quiz.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-2 rounded-full bg-amber-500/10 px-4 py-2 text-lg font-medium text-amber-500"
            >
              <span>⏱️</span>
              <span>{formatTime(timeLeft)}</span>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Points: {question.points}
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
              <motion.div
                className="h-2 bg-amber-500 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
                }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="mb-6 text-xl font-medium text-black dark:text-white">
              {question.question}
            </h2>

            {question.type === 'short_answer' ? (
              <textarea
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white/50 p-4 text-base text-body-color outline-none backdrop-blur-sm transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-600 dark:bg-gray-dark/50 dark:text-body-color-dark"
                rows={4}
                placeholder="Enter your answer..."
              />
            ) : (
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="group relative"
                  >
                    <input
                      type={question.type === 'multiple_choice' ? 'radio' : 'checkbox'}
                      id={`option-${index}`}
                      name={`question-${currentQuestion}`}
                      checked={answers[currentQuestion] === option.text}
                      onChange={() => handleAnswer(option.text)}
                      className="peer absolute h-0 w-0 opacity-0"
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="flex cursor-pointer items-center space-x-4 rounded-xl border border-gray-300 bg-white/50 p-4 text-base text-body-color transition-all duration-300 hover:border-amber-500 hover:bg-amber-500/10 peer-checked:border-amber-500 peer-checked:bg-amber-500/10 dark:border-gray-600 dark:bg-gray-dark/50 dark:text-body-color-dark"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 transition-all duration-300 group-hover:border-amber-500 peer-checked:border-amber-500 peer-checked:bg-amber-500 dark:border-gray-600">
                        {question.type === 'multiple_choice' ? (
                          <div className="h-3 w-3 rounded-full bg-amber-500 opacity-0 transition-all duration-300 peer-checked:opacity-100" />
                        ) : (
                          <svg
                            className="h-4 w-4 text-amber-500 opacity-0 transition-all duration-300 peer-checked:opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span>{option.text}</span>
                    </label>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="rounded-full border-2 border-amber-500 bg-amber-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-amber-500 disabled:opacity-50 disabled:hover:bg-amber-500 disabled:hover:text-white dark:bg-transparent dark:text-white dark:hover:border-2 dark:hover:border-amber-500 dark:hover:bg-amber-500"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestion === quiz.questions.length - 1}
              className="rounded-full border-2 border-amber-500 bg-amber-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-amber-500 disabled:opacity-50 disabled:hover:bg-amber-500 disabled:hover:text-white dark:bg-transparent dark:text-white dark:hover:border-2 dark:hover:border-amber-500 dark:hover:bg-amber-500"
            >
              Next
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-full border-2 border-amber-500 bg-amber-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-amber-500 dark:bg-transparent dark:text-white dark:hover:border-2 dark:hover:border-amber-500 dark:hover:bg-amber-500"
            >
              Submit
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Background SVG */}
      <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="450"
          height="556"
          viewBox="0 0 450 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="277"
            cy="63"
            r="225"
            className="fill-amber-500 opacity-90"
          />
          <circle
            cx="17.9997"
            cy="182"
            r="18"
            className="fill-yellow opacity-20"
          />
          <circle
            cx="76.9997"
            cy="288"
            r="34"
            className="fill-yellow opacity-20"
          />
          <circle
            cx="325.486"
            cy="302.87"
            r="180"
            transform="rotate(-37.6852 325.486 302.87)"
            className="fill-yellow opacity-30"
          />
          <circle
            opacity="0.8"
            cx="184.521"
            cy="315.521"
            r="132.862"
            transform="rotate(114.874 184.521 315.521)"
            className="stroke-amber-500 opacity-70"
          />
          <circle
            opacity="0.8"
            cx="356"
            cy="290"
            r="179.5"
            transform="rotate(-30 356 290)"
            className="stroke-amber-500 opacity-70"
          />
          <circle
            opacity="0.8"
            cx="191.659"
            cy="302.659"
            r="133.362"
            transform="rotate(133.319 191.659 302.659)"
            className="fill-yellow opacity-30"
          />
        </svg>
      </div>
    </div>
  );
} 