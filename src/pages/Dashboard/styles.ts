import styled from 'styled-components'

export const Container = styled.div``

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`

export const HeaderContent = styled.div`
  max-width: 1110px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #999591;
    width: 20px;
    height: 20px;

    &:hover {
      color: #c53030;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }
  }
`

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 28px;
    color: #66819a;
  }
  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #5accc2;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      padding: 16px 16px;
      background: #5accc2;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }
  }
`

export const ProductsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;

  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  justify-content: center;
`
