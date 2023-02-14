import { Box, Button, styled, Text } from '@ignite-ui/react'

export const Content = styled('div', {
  maxWidth: 572,
  [`${Button}`]: {
    marginTop: '$6',
  },
})
export const Form = styled(Box, {
  display: 'flex',
  gap: '$4',
  flexDirection: 'column',
  [`${Text}`]: {
    marginBottom: '$2',
  },

  label: {
    height: '6rem',
  },
})
export const Header = styled('div', {
  [`${Text}`]: {
    color: '$gray200',
    marginTop: '$2',
    marginBottom: '$4',
  },
  marginBottom: '$4',
})

export const ErrorMessage = styled(Text, {
  color: '#f75a68',
})
