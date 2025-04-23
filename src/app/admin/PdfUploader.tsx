'use client'

import { useState } from 'react'

export default function PdfUploadForm() {
  const [title, setTitle] = useState('')
  const [pdf, setPdf] = useState<File | null>(null)
  const [path, setPath] = useState('')
  const [grade, setGrade] = useState('')

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pdf) {
      alert('Please select a PDF file.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('pdf', pdf)
    formData.append('path', path)
    formData.append('grade', grade)

    const res = await fetch('/api/pdfuploader', {
      method: 'POST',
      body: formData,
    })

    const result = await res.json()
    alert(result.message)
  }

  return (
    <form onSubmit={handleUpload}
      className="space-y-4 shadow-md shadow-black/70 p-6 rounded-xl max-w-[500px] ">
      <div className='text-black text-center text-2xl '>Upload PDF</div>
      <div>
        <label className='ml-4 text-xl text-green-500'>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter the title here ........'
          className="border p-2 w-full rounded-full text-red-500 bg-white placeholder:text-gray-500"
          required
        />
      </div>

      <div>
        <label className='ml-4 text-xl text-green-500'>Grade:</label>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="border p-2 w-full rounded-full text-red-500 bg-white"
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
        <label className='ml-4 text-xl text-green-500'>Upload Path (example: /public/pdf/):</label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder='Enter path here..........'
          className="border p-2 w-full rounded-full text-red-500  bg-white placeholder:text-gray-500"
          required
        />
      </div>

      <div>
        <label className='ml-4 text-xl text-green-500'>pdf File:</label>
        <input
          type="file"
          accept="pdf/*"
          onChange={(e) => setPdf(e.target.files?.[0] || null)}
          className="border p-2 w-full rounded-full text-red-500"
          required
        />
      </div>

      <div className="w-full ">
        <button type="submit" className="bg-green-600 hover:bg-orange-500 text-white py-2 px-6 rounded-full">
          Upload PDF
        </button>
      </div>
    </form>
  )
}
