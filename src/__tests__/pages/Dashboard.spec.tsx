import React from 'react'

import { render, fireEvent, act, wait } from '@testing-library/react'
import AxiosMock from 'axios-mock-adapter'
import api from '../../services/api'

import Dashboard from '../../pages/Dashboard'

const apiMock = new AxiosMock(api)

const mockedAddToast = jest.fn()

const mockedUser = jest.fn()

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: mockedUser
    })
  }
})

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    })
  }
})

describe('Dashboard', () => {
  it('should be able to list all the products from your api', async () => {
    apiMock.onGet('products').reply(200, [
      {
        id: 1,
        name: 'Produto 01',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '19.90',
        image:
          'https://www.receitasnestle.com.br/images/default-source/recipes/macarrao_ao_molho_branco_incrementado.tmb-customthum.jpg'
      },
      {
        id: 2,
        name: 'Produto 02',
        description:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        price: '19.90',

        image:
          'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/MV_1_G5_hero.jpg'
      },
      {
        id: 3,
        name: 'Produto 03',
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        price: '19.90',

        image:
          'https://images-na.ssl-images-amazon.com/images/I/413V3QwQ2sL._AC_.jpg'
      }
    ])

    const { getByText, getByTestId } = render(<Dashboard />)

    await wait(() => expect(getByText('Produto 01')).toBeTruthy(), {
      timeout: 200
    })

    expect(getByText('Produto 01')).toBeTruthy()
    expect(
      getByText(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      )
    ).toBeTruthy()
    expect(getByTestId('remove-product-1')).toBeTruthy()
    expect(getByTestId('edit-product-1')).toBeTruthy()

    expect(getByText('Produto 02')).toBeTruthy()
    expect(
      getByText(
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      )
    ).toBeTruthy()
    expect(getByTestId('remove-product-2')).toBeTruthy()
    expect(getByTestId('edit-product-3')).toBeTruthy()

    expect(getByText('Produto 03')).toBeTruthy()
    expect(
      getByText(
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      )
    ).toBeTruthy()
    expect(getByTestId('remove-product-3')).toBeTruthy()
    expect(getByTestId('edit-product-3')).toBeTruthy()
  })

  it('should be able to add a new product', async () => {
    apiMock.onGet('products').reply(200, [])

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Dashboard />
    )

    act(() => {
      fireEvent.click(getByText('Novo Produto'))
    })

    const inputImage = getByPlaceholderText(
      'Cole o link aqui'
    ) as HTMLInputElement
    const inputName = getByPlaceholderText(
      'Ex: Moda Italiana'
    ) as HTMLInputElement
    const inputValue = getByPlaceholderText('Ex: 19.90') as HTMLInputElement
    const inputDescription = getByPlaceholderText(
      'Descrição'
    ) as HTMLInputElement

    await act(async () => {
      fireEvent.change(inputImage, {
        target: {
          value:
            'https://www.receitasnestle.com.br/images/default-source/recipes/macarrao_ao_molho_branco_incrementado.tmb-customthum.jpg'
        }
      })
      fireEvent.change(inputName, { target: { value: 'Produto 01' } })
      fireEvent.change(inputValue, { target: { value: '19.90' } })
      fireEvent.change(inputDescription, {
        target: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      })
    })

    expect(inputImage.value).toBe(
      'https://www.receitasnestle.com.br/images/default-source/recipes/macarrao_ao_molho_branco_incrementado.tmb-customthum.jpg'
    )
    expect(inputName.value).toBe('Produto 01')
    expect(inputValue.value).toBe('19.90')
    expect(inputDescription.value).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    )

    apiMock.onPost('products').reply(200, {
      id: 1,
      name: 'Produto 01',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: '19.90',

      image:
        'https://www.receitasnestle.com.br/images/default-source/recipes/macarrao_ao_molho_branco_incrementado.tmb-customthum.jpg'
    })

    await act(async () => {
      fireEvent.click(getByTestId('add-product-button'))
    })

    await wait(() => expect(getByText('Produto 01')).toBeTruthy(), {
      timeout: 200
    })

    expect(getByText('Produto 01')).toBeTruthy()
    expect(
      getByText(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      )
    ).toBeTruthy()
    expect(getByTestId('remove-product-1')).toBeTruthy()
    expect(getByTestId('edit-product-1')).toBeTruthy()
  })

  it('should be able to edit a product', async () => {
    apiMock.onGet('products').reply(200, [
      {
        id: 1,
        name: 'Produto 01',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '19.90',

        image:
          'https://www.receitasnestle.com.br/images/default-source/recipes/macarrao_ao_molho_branco_incrementado.tmb-customthum.jpg'
      }
    ])

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Dashboard />
    )

    await wait(() => expect(getByText('Produto 01')).toBeTruthy(), {
      timeout: 200
    })

    expect(getByText('Produto 01')).toBeTruthy()
    expect(
      getByText(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      )
    ).toBeTruthy()
    expect(getByTestId('remove-product-1')).toBeTruthy()
    expect(getByTestId('edit-product-1')).toBeTruthy()

    act(() => {
      fireEvent.click(getByTestId('edit-product-1'))
    })

    const inputImage = getByPlaceholderText(
      'Cole o link aqui'
    ) as HTMLInputElement
    const inputName = getByPlaceholderText(
      'Ex: Moda Italiana'
    ) as HTMLInputElement
    const inputValue = getByPlaceholderText('Ex: 19.90') as HTMLInputElement
    const inputDescription = getByPlaceholderText(
      'Descrição'
    ) as HTMLInputElement

    await act(async () => {
      fireEvent.change(inputImage, {
        target: {
          value:
            'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/MV_1_G5_hero.jpg'
        }
      })
      fireEvent.change(inputName, { target: { value: 'Produto 02' } })
      fireEvent.change(inputValue, { target: { value: '21.90' } })
      fireEvent.change(inputDescription, {
        target: {
          value:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      })
    })

    expect(inputImage.value).toBe(
      'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/MV_1_G5_hero.jpg'
    )
    expect(inputName.value).toBe('Produto 02')
    expect(inputValue.value).toBe('21.90')
    expect(inputDescription.value).toBe(
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    )

    apiMock.onPut('products/1').reply(200, {
      id: 1,
      name: 'Produto 02',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price: '21.90',

      image:
        'https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/MV_1_G5_hero.jpg'
    })

    await act(async () => {
      fireEvent.click(getByTestId('edit-product-button'))
    })

    await wait(() => expect(getByText('Produto 02')).toBeTruthy(), {
      timeout: 200
    })

    expect(getByText('Produto 02')).toBeTruthy()
    expect(
      getByText(
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      )
    ).toBeTruthy()
    expect(getByTestId('remove-product-1')).toBeTruthy()
    expect(getByTestId('edit-product-1')).toBeTruthy()
  })

  it('should be able to remove a product', async () => {
    apiMock.onGet('products').reply(200, [
      {
        id: 1,
        name: 'Produto 01',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '19.90',
        image:
          'https://www.receitasnestle.com.br/images/default-source/recipes/macarrao_ao_molho_branco_incrementado.tmb-customthum.jpg'
      }
    ])

    apiMock.onDelete('products/1').reply(204)

    const { getByText, getByTestId } = render(<Dashboard />)

    await wait(() => expect(getByText('Produto 01')).toBeTruthy(), {
      timeout: 200
    })

    expect(getByText('Produto 01')).toBeTruthy()
    expect(
      getByText(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      )
    ).toBeTruthy()
    expect(getByTestId('remove-product-1')).toBeTruthy()
    expect(getByTestId('edit-product-1')).toBeTruthy()

    await act(async () => {
      fireEvent.click(getByTestId('remove-product-1'))
    })

    expect(getByTestId('products-list')).toBeEmpty()
  })
})
