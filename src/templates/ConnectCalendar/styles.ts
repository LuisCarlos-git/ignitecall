import { Box, Button, styled } from '@ignite-ui/react'

export const Wrapper = styled('main', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
})

export const Content = styled('div', {
  maxWidth: 572,
})

export const ConnectCalendarWrapper = styled(Box, {})

export const ConnectContent = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '$md',
  padding: '$4',
  border: '1px solid $gray600',
  alignSelf: 'center',
})

export const NextStepWrapper = styled('div', {
  display: 'flex',
  marginTop: '$6',
  [`${Button}`]: {
    width: '100%',
  },
})
