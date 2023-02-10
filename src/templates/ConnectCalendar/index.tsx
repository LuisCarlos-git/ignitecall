import { FormHeader } from '@/components'
import { Button, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import * as Styled from './styles'

export const ConnectCalendarTemplate = () => {
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
            <Button variant="secondary" type="button">
              Conectar
              <ArrowRight />
            </Button>
          </Styled.ConnectContent>
        </Styled.ConnectCalendarWrapper>

        <Styled.NextStepWrapper>
          <Button type="button">
            <Text size="lg">Proximo passo</Text>
            <ArrowRight />
          </Button>
        </Styled.NextStepWrapper>
      </Styled.Content>
    </Styled.Wrapper>
  )
}
