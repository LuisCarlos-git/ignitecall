import { NextApiRequest, NextApiResponse } from 'next'
import { Adapter } from 'next-auth/adapters'
import { destroyCookie, parseCookies } from 'nookies'
import { prismaClient } from '../prisma'

export function CustomPrismaAdpter(
  req: NextApiRequest,
  res: NextApiResponse,
): Adapter {
  return {
    async createUser(user) {
      const { '@ignitecall:userId': userIdOnCookies } = parseCookies({ req })

      if (!userIdOnCookies) throw new Error('user not logged in')

      const prismauser = await prismaClient.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          username: user.username,
          avatar_url: user.avatar_url,
          email: user.email,
        },
      })

      destroyCookie({ res }, '@ignitecall:userId', { path: '/' })

      return {
        id: prismauser.id,
        username: prismauser.username,
        name: prismauser.name,
        emailVerified: null,
        avatar_url: prismauser.avatar_url!,
        email: prismauser.email!,
      }
    },
    async getUser(id) {
      const user = await prismaClient.user.findUnique({
        where: { id },
      })

      if (!user) return null

      return {
        id: user.id,
        username: user.username,
        name: user.name,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        email: user.email!,
      }
    },
    async getUserByEmail(email) {
      const user = await prismaClient.user.findUnique({
        where: { email },
      })

      if (!user) return null

      return {
        id: user.id,
        username: user.username,
        name: user.name,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        email: user.email!,
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prismaClient.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) return null

      const { user } = account

      return {
        id: user.id,
        username: user.username,
        name: user.name,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        email: user.email!,
      }
    },
    async updateUser(user) {
      const prismaUser = await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: prismaUser.id,
        username: prismaUser.username,
        name: prismaUser.name,
        emailVerified: null,
        avatar_url: prismaUser.avatar_url!,
        email: prismaUser.email!,
      }
    },
    async linkAccount(account) {
      await prismaClient.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },
    async createSession({ sessionToken, userId, expires }) {
      await prismaClient.session.create({
        data: {
          session_token: sessionToken,
          user_id: userId,
          expires,
        },
      })

      return {
        sessionToken,
        userId,
        expires,
      }
    },
    async getSessionAndUser(sessionToken) {
      const sessionUser = await prismaClient.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!sessionUser) return null

      const { user, ...session } = sessionUser

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          emailVerified: null,
          avatar_url: user.avatar_url!,
          email: user.email!,
        },
      }
    },
    async updateSession({ sessionToken, expires, userId }) {
      const prismaSession = await prismaClient.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        sessionToken: prismaSession.session_token,
        expires: prismaSession.expires,
        userId: prismaSession.user_id,
      }
    },

    async deleteSession(sessionToken) {
      await prismaClient.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
