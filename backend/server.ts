import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

const main = async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
  )
}

main().then(async () => {
  await prisma.$connect().catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
})
