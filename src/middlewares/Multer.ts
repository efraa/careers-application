import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const { mimetype } = file
    cb(null, `${Date.now()}.${mimetype.split('/')[1]}`)
  },
})

const validateExt = (extensions: RegExp, mimetype: string, ext: string) =>
  extensions.test(mimetype) && extensions.test(path.extname(ext)) ? true : false

export { storage, multer, validateExt }
