'use client';

import { useState } from 'react';
import { FiPlus, FiTrash, FiSave } from 'react-icons/fi';

interface Question {
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options: { text: string; isCorrect: boolean }[];
  points: number;
}

export default function QuizCreator() {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    grade: '',
    subject: '',
    timeLimit: 30,
    passingScore: 60,
    questions: [] as Question[],
  });

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          question: '',
          type: 'multiple_choice',
          options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ],
          points: 1,
        },
      ],
    });
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options.push({
      text: '',
      isCorrect: false,
    });
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    field: string,
    value: any
  ) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options[optionIndex] = {
      ...updatedQuestions[questionIndex].options[optionIndex],
      [field]: value,
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz),
      });

      if (res.ok) {
        // Reset form or show success message
        alert('Quiz created successfully!');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Create New Quiz</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={quiz.description}
                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Grade
                </label>
                <select
                  value={quiz.grade}
                  onChange={(e) => setQuiz({ ...quiz, grade: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="grade1">Grade 1</option>
                  <option value="grade2">Grade 2</option>
                  <option value="grade3">Grade 3</option>
                  <option value="grade4">Grade 4</option>
                  <option value="grade5">Grade 5</option>
                  <option value="grade6">Grade 6</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  value={quiz.subject}
                  onChange={(e) => setQuiz({ ...quiz, subject: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    setQuiz({ ...quiz, timeLimit: Number(e.target.value) })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  value={quiz.passingScore}
                  onChange={(e) =>
                    setQuiz({ ...quiz, passingScore: Number(e.target.value) })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Questions</h3>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <FiPlus />
              <span>Add Question</span>
            </button>
          </div>

          <div className="space-y-6">
            {quiz.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(qIndex, 'question', e.target.value)
                      }
                      placeholder="Enter question"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedQuestions = quiz.questions.filter(
                        (_, index) => index !== qIndex
                      );
                      setQuiz({ ...quiz, questions: updatedQuestions });
                    }}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Question Type
                    </label>
                    <select
                      value={question.type}
                      onChange={(e) =>
                        updateQuestion(qIndex, 'type', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="true_false">True/False</option>
                      <option value="short_answer">Short Answer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Points
                    </label>
                    <input
                      type="number"
                      value={question.points}
                      onChange={(e) =>
                        updateQuestion(qIndex, 'points', Number(e.target.value))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {question.type !== 'short_answer' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Options
                      </label>
                      {question.type === 'multiple_choice' && (
                        <button
                          type="button"
                          onClick={() => addOption(qIndex)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Add Option
                        </button>
                      )}
                    </div>

                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type={
                            question.type === 'multiple_choice'
                              ? 'radio'
                              : 'checkbox'
                          }
                          checked={option.isCorrect}
                          onChange={(e) =>
                            updateOption(
                              qIndex,
                              oIndex,
                              'isCorrect',
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) =>
                            updateOption(
                              qIndex,
                              oIndex,
                              'text',
                              e.target.value
                            )
                          }
                          placeholder={`Option ${oIndex + 1}`}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                        {question.type === 'multiple_choice' &&
                          question.options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updatedQuestions = [...quiz.questions];
                                updatedQuestions[qIndex].options = question.options.filter(
                                  (_, index) => index !== oIndex
                                );
                                setQuiz({
                                  ...quiz,
                                  questions: updatedQuestions,
                                });
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash />
                            </button>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiSave />
            <span>Save Quiz</span>
          </button>
        </div>
      </form>
    </div>
  );
} 