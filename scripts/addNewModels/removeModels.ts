/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import 'colors'
import { promises } from 'fs'
import { join, resolve } from 'path'

const fsPromises = promises
const dirPath = join(process.cwd(), '../swaggerModels/model/')

export const removeModels = async (patterns: RegExp[], excludeFiles: string[]) => {
  await fsPromises.unlink(resolve(`${dirPath}models.ts`))
  const fileNames = await fsPromises.readdir(resolve(dirPath))

  for (const fileName of fileNames) {
    if (excludeFiles.includes(fileName)) {
      continue
    }

    const fileContent = await fsPromises.readFile(dirPath + fileName, 'utf8')
    for (const pattern of patterns) {
      if (pattern.test(fileContent)) {
        fsPromises.unlink(resolve(dirPath + fileName))
        break
      }
    }
  }
}
