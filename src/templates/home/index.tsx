import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'

import { calendar } from '@/assets/images'

import * as Styled from './styles'

export const HomeTemplate = () => (
  <Styled.Wrapper>
    <Styled.Hero>
      <Heading size="4xl">Agendamento descomplicado</Heading>
      <Text size="xl">
        Conecte seu calendário e permita que as pessoas marquem agendamentos no
        seu tempo livre.
      </Text>
    </Styled.Hero>
    <Styled.Preview>
      <Image
        src={calendar}
        height={400}
        priority
        quality={100}
        alt="calender"
      />
    </Styled.Preview>
  </Styled.Wrapper>
)
