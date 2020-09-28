import React, { useRef, useCallback } from 'react'

import { FiCheckSquare } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Form } from './styles'

import Modal from '../Modal'
import Input from '../Input'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'

interface IProductItem {
  id: number
  name: string
  image: string
  price: string
  description: string
}

interface ICreateProductData {
  name: string
  image: string
  price: string
  description: string
}

interface IModalProps {
  isOpen: boolean
  setIsOpen: () => void
  handleAddProduct: (product: Omit<IProductItem, 'id'>) => void
}

const ModalAddProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddProduct
}) => {
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: ICreateProductData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          image: Yup.string().required('Url da imagem é obrigatória'),
          name: Yup.string().required('Nome do produto é obrigatório'),
          price: Yup.number().required('Preço do produto é obrigatório'),
          description: Yup.string().required(
            'A descrição do produto é obrigatório'
          )
        })

        await schema.validate(data, {
          abortEarly: false
        })

        handleAddProduct(data)
        setIsOpen()
        addToast({
          type: 'success',
          title: 'Produto cadastrado com sucesso'
        })
      } catch (err) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    },
    [handleAddProduct, setIsOpen, addToast]
  )

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Produto</h1>
        <Input name='image' placeholder='Cole o link aqui' />

        <Input name='name' placeholder='Ex: Moda Italiana' />
        <Input name='price' placeholder='Ex: 19.90' />

        <Input name='description' placeholder='Descrição' />
        <button type='submit' data-testid='add-product-button'>
          <p className='text'>Adicionar Produto</p>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalAddProduct
