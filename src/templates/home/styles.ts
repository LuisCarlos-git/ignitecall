import { styled, Heading, Text } from '@ignite-ui/react'

export const Wrapper = styled('section', {
  display: 'flex',
  height: '100vh',
  gap: '$20',
  alignItems: 'center',
  marginLeft: 'auto',
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
})

export const Preview = styled('div', {
  overflow: 'hidden',
})

export const Hero = styled('div', {
  maxWidth: 400,
  marginRight: '$16',
  [`${Heading}`]: {
    marginBottom: '$4',
  },
  [`${Text}`]: {
    color: '$gray200',
  },
})
