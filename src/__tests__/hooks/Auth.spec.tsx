import { renderHook, act } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'

import api from '../../services/api'
import { useAuth, AuthProvider } from '../../hooks/auth'

const apiMock = new MockAdapter(api)

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user-id',
        name: 'New User',
        email: 'newuser@example.com'
      },
      token: 'jwt-token'
    }

    apiMock.onPost('sessions').reply(200, apiResponse)

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    result.current.signIn({
      email: 'newuser@example.com',
      password: '12345678'
    })

    await waitForNextUpdate()

    expect(setItemSpy).toHaveBeenCalledWith(
      '@MyProducts:token',
      apiResponse.token
    )
    expect(setItemSpy).toHaveBeenCalledWith(
      '@MyProducts:user',
      JSON.stringify(apiResponse.user)
    )

    expect(result.current.user.email).toEqual('newuser@example.com')
  })

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@MyProducts:token':
          return 'jwt-token'
        case '@MyProducts:user':
          return JSON.stringify({
            id: 'user-id',
            name: 'New User',
            email: 'newuser@example.com'
          })
        default:
          return null
      }
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    expect(result.current.user.email).toEqual('newuser@example.com')
  })

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@MyProducts:token':
          return 'jwt-token'
        case '@MyProducts:user':
          return JSON.stringify({
            id: 'user-id',
            name: 'New User',
            email: 'newuser@example.com'
          })
        default:
          return null
      }
    })

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem')

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    act(() => {
      result.current.signOut()
    })

    expect(removeItemSpy).toHaveBeenCalledTimes(2)
    expect(result.current.user).toBeUndefined()
  })
})
