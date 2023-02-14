import { z } from 'zod'

export const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Nome do usuário muito curto' })
    .regex(/^[a-zA-Z-]+$/, {
      message: 'Nome do usuário tem caracteres inválidos',
    })
    .transform((value) => value.toLowerCase()),

  fullname: z.string().min(1, { message: 'Nome completo e obrigtório' }),
})

export type FormValues = z.infer<typeof schema>
