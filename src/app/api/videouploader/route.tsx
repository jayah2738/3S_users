import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req, res) {
  
  if (req.method === 'POST') {
    const form = formidable({ multiples: false, uploadDir: './public/videos', keepExtensions: true })

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: 'Upload failed', error: err })
        return
      }

      const title = fields.title
      const uploadPath = fields.path
      const videoFile = files.video

      const destPath = path.join(process.cwd(), uploadPath, videoFile.originalFilename || videoFile.newFilename)

      fs.rename(videoFile.filepath, destPath, (err) => {
        if (err) {
          res.status(500).json({ message: 'Failed to save video file.', error: err })
          return
        }

        res.status(200).json({ message: 'Video uploaded successfully!' })
      })
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
