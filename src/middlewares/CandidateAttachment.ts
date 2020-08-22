import { multer, storage, validateExt } from './Multer'

export const CandidateAttachment = multer({
  storage,
  limits: {
    fileSize: 55000000,
  },
  fileFilter: (req, file, cb) =>
    cb(null, validateExt(/pdf|PDF/, file.mimetype, file.originalname)),
}).single('attachment')
