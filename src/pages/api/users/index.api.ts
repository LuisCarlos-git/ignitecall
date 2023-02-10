import { NextApiResponse, NextApiRequest } from 'next'
import { setCookie } from 'nookies'

import { prismaClient } from '@/services/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body
  const userAlreadyExists = await prismaClient.user.findUnique({
    where: {
      username,
    },
  })

  if (userAlreadyExists) {
    return res.status(400).json({ message: 'username already exists' })
  }

  const user = await prismaClient.user.create({
    data: {
      name,
      username,
    },
  })

  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  res.status(201).json(user)
}
