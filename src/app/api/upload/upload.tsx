// import nextConnect from 'next-connect';
// import multer from 'multer';
// import cloudinary from '@/lib/cloudinary';
// import fs from 'fs';

// const upload = multer({ dest: '/tmp' }); // Temp folder

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res.status(501).json({ error: `Something went wrong: ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// apiRoute.use(upload.single('file')); // field name is 'file'

// apiRoute.post(async (req, res) => {
//   const result = await cloudinary.uploader.upload(req.file.path, {
//     folder: 'your_folder_name', // optional
//   });

//   // Optional: Delete file from temp
//   fs.unlinkSync(req.file.path);

//   // Save result.secure_url to your database here (MongoDB via Prisma)

//   res.status(200).json({ url: result.secure_url });
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
