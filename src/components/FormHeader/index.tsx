import { Heading, MultiStep, Text } from '@ignite-ui/react'
import * as Styled from './styles'

type FormHeaderProps = {
  numberOfSteps: number
  currentStep: number
  title: string
  subtext: string
}

export const FormHeader = ({
  currentStep,
  numberOfSteps,
  subtext,
  title,
}: FormHeaderProps) => (
  <Styled.Header>
    <Heading as="h1" size="3xl">
      {title}
    </Heading>
    <Text size="lg">{subtext}</Text>
    <MultiStep currentStep={currentStep} size={numberOfSteps} />
  </Styled.Header>
)
