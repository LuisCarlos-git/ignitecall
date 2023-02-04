import { Box, styled } from '@ignite-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  padding: '$4',
})

export const AlertMessage = styled('p', {
  color: '$gray200',
  marginTop: '$4',
})

export const ClaimUsernameWrapper = styled('div', {
  height: '$20',
})
