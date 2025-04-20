'use client'

import { useState } from 'react'

export default function PdfUploadForm() {
  const [title, setTitle] = useState('')
  const [pdf, setPdf] = useState<File | null>(null)
  const [path, setPath] = useState('')

  

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pdf) {
      alert('Please select a video file.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('video', pdf)
    formData.append('path', path)

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
      <div className='text-black text-center text-2xl '>Upload Pdf</div>
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
          Upload PDf
        </button>
      </div>
    </form>
  )
}
