import { ArrowRight } from 'phosphor-react'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'

import * as Styled from './styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Nome do usuário muito curto' })
    .regex(/^[a-zA-Z-]+$/, {
      message: 'Nome do usuário tem caracteres inválidos',
    })
    .transform((value) => value.toLowerCase()),

  fullname: z.string().min(1, { message: 'Nome completo e obrigtório' }),
})

type FormValues = z.infer<typeof schema>

export const RegisterTemplate = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query?.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  const handleRegister = (values: FormValues) => {
    console.log(values)
  }
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Header>
          <Heading as="h1" size="3xl">
            Bem-vindo ao Ignite Call!
          </Heading>
          <Text size="lg">
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep currentStep={1} size={4} />
        </Styled.Header>
        <Styled.Form onSubmit={handleSubmit(handleRegister)} as="form">
          <label>
            <Text>Nome de usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu usuário"
              {...register('username')}
            />
            {errors?.username && (
              <Styled.ErrorMessage>
                {errors.username.message}
              </Styled.ErrorMessage>
            )}
          </label>
          <label>
            <Text>Nome completo</Text>
            <TextInput
              placeholder="ex: Luis Carlos"
              {...register('fullname')}
            />
            {errors?.fullname && (
              <Styled.ErrorMessage>
                {errors.fullname.message}
              </Styled.ErrorMessage>
            )}
          </label>
          <Button type="submit" disabled={isSubmitting}>
            <ArrowRight />
            Registrar
          </Button>
        </Styled.Form>
      </Styled.Content>
    </Styled.Wrapper>
  )
}
