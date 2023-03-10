import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextInput } from '@ignite-ui/react'

import { api } from '@/services/axios'

import { FormHeader } from '@/components/FormHeader'

import { FormValues, schema } from './schema'

import * as Styled from './styles'

export const RegisterUserForm = () => {
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

  const handleRegister = async (values: FormValues) => {
    try {
      await api.post('/users', {
        name: values.fullname,
        username: values.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Styled.Content>
      <FormHeader
        currentStep={1}
        numberOfSteps={4}
        title="Bem-vindo ao Ignite Call!"
        subtext="Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois."
      />
      <Styled.Form onSubmit={handleSubmit(handleRegister)} as="form">
        <label>
          <Text>Nome de usuário</Text>
          <TextInput
            autoComplete="off"
            prefix="ignite.com/"
            placeholder="seu usuário"
            {...register('username')}
          />
          {errors?.username && (
            <Styled.ErrorMessage>{errors.username.message}</Styled.ErrorMessage>
          )}
        </label>
        <label>
          <Text>Nome completo</Text>
          <TextInput
            autoComplete="off"
            placeholder="ex: Luis Carlos"
            {...register('fullname')}
          />
          {errors?.fullname && (
            <Styled.ErrorMessage>{errors.fullname.message}</Styled.ErrorMessage>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          <ArrowRight />
          Registrar
        </Button>
      </Styled.Form>
    </Styled.Content>
  )
}
