import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import { router } from 'src/router'
import { errorMiddleware } from 'src/middleware/error-middleware'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

// @ts-ignore
app.use(errorMiddleware)

export const prisma = new PrismaClient()

const main = async () => {
  await prisma.$connect()
  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
  )
}

main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
