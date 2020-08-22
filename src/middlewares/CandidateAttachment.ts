import { multer, storage, validateExt } from './Multer'

export const CandidateAttachment = multer({
  storage,
  limits: {
    fileSize: 55000000,
  },
  fileFilter: (req, file, cb) =>
    cb(
      null,
      validateExt(
        /doc|DOC|pdf|PDF|txt|docx|xls|xlsx/,
        file.mimetype,
        file.originalname
      )
    ),
}).single('attachment')
