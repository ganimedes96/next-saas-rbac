import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a new account',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
          name: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, password, name } = request.body
      const userWithSomeEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })
      if (userWithSomeEmail) {
        throw new BadRequestError('User already exists')
      }

      const [, domain] = email.split('@')

      const autoJoinOrganization = await prisma.organization.findFirst({
        where: {
          domain,
          shouldAttachUsersByDomain: true,
        },
      })

      const passwordHash = await hash(password, 6)
      await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
          member_on: autoJoinOrganization
            ? {
                create: {
                  organizationId: autoJoinOrganization.id,
                },
              }
            : undefined,
        },
      })
      return reply.status(201).send()
    },
  )
}