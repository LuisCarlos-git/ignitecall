import { Button, Text } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'

import { FormHeader } from '@/components'

import * as Styled from './styles'
import { useRouter } from 'next/router'

export const ConnectCalendarTemplate = () => {
  const router = useRouter()
  const { data, status } = useSession()

  const hasAuthError = !!router?.query?.error
  const isLogged = status === 'authenticated'

  const handleSignInGoogle = async () => {
    await signIn('google')
  }

  console.log(data)

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <FormHeader
          currentStep={2}
          numberOfSteps={4}
          title="Conecte sua agenda!"
          subtext="Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados."
        />

        <Styled.ConnectCalendarWrapper>
          <Styled.ConnectContent>
            <Text size="lg">Google Agenda</Text>
            {isLogged ? (
              <Button type="button" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                onClick={handleSignInGoogle}
                variant="secondary"
                type="button"
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </Styled.ConnectContent>
          {hasAuthError && (
            <Styled.AuthError>
              Falha ao conectar com o Google, verifique se você autorizou as
              permissões de acesso ao Google Calendar
            </Styled.AuthError>
          )}
        </Styled.ConnectCalendarWrapper>

        <Styled.NextStepWrapper>
          <Button type="button" disabled={!isLogged}>
            <Text size="lg">Proximo passo</Text>
            <ArrowRight />
          </Button>
        </Styled.NextStepWrapper>
      </Styled.Content>
    </Styled.Wrapper>
  )
}
