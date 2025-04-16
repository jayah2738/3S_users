'use client'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const API_URL = 'http://localhost:4000/todos';

  const fetchTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    setInput('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText })
    });
    setEditingId(null);
    setEditText('');
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">📝 To-Do List</h1>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            placeholder="Enter a task"
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border text-black placeholder:text-black border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-400"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          <AnimatePresence>
            {todos.map(todo => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 80 }}
                transition={{ duration: 0.2, type:'spring',bounce:.4 }}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl"
              >
                {editingId === todo.id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow border border-gray-300 rounded-full px-2 py-1 mr-2 bg-gray-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="flex-grow text-gray-800">{todo.text}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="bg-amber-400 hover:bg-orange-500 text-white px-5 py-1 rounded-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-1 rounded-full"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
