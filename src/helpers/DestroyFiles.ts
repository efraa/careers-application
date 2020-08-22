import fs from 'fs'
import path from 'path'

export const destroyFiles = async (file: string) => {
  const filePath = path.resolve(`uploads/${file}`)
  if (fs.existsSync(filePath)) await fs.unlinkSync(filePath)
}
