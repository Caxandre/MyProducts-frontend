import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  justify-content: center;
  flex-direction: column;
  display: flex;
  flex-direction: column;

  width: 100%;
`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      color: #66819a;
      margin-bottom: 24px;
    }
  }

  > a {
    color: #66819a;
    display: block;
    margin-top: 24px;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: color 0.2s;

    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#66819a')};
    }
  }
`
