import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextInput } from '@ignite-ui/react'

import * as Styled from './styles'
import { useRouter } from 'next/router'

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Nome do usuário muito curto' })
    .regex(/^[a-zA-Z-]+$/, {
      message: 'Nome do usuário tem caracteres inválidos',
    })
    .transform((value) => value.toLowerCase()),
})

type FormValues = z.infer<typeof schema>

export const ClaimUsernameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  const handleClaimFormSubmit = async (values: FormValues) => {
    await router.push(`/register?username=${values.username}`)
  }

  return (
    <Styled.ClaimUsernameWrapper>
      <Styled.Form as="form" onSubmit={handleSubmit(handleClaimFormSubmit)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu usuário"
          autoComplete="off"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          <ArrowRight />
          Reservar
        </Button>
      </Styled.Form>
      {errors.username && (
        <Styled.AlertMessage>{errors.username.message}</Styled.AlertMessage>
      )}
    </Styled.ClaimUsernameWrapper>
  )
}
