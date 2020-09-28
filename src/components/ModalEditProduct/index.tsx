import React, { useRef, useCallback } from 'react'

import { FiCheckSquare } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
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

interface IModalProps {
  isOpen: boolean
  setIsOpen: () => void
  handleUpdateProduct: (product: Omit<IProductItem, 'id'>) => void
  editingProduct: IProductItem
}

interface IEditProductData {
  name: string
  image: string
  price: string
  description: string
}

const ModalEditProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingProduct,
  handleUpdateProduct
}) => {
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: IEditProductData) => {
      try {
        formRef.current?.setErrors({})
        handleUpdateProduct(data)
        setIsOpen()
        addToast({
          type: 'success',
          title: 'Produto atualizado com sucesso'
        })
      } catch (err) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    },
    [handleUpdateProduct, setIsOpen, addToast]
  )

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingProduct}>
        <h1>Editar Produto</h1>
        <Input name='image' placeholder='Cole o link aqui' />

        <Input name='name' placeholder='Ex: Moda Italiana' />
        <Input name='price' placeholder='Ex: 19.90' />

        <Input name='description' placeholder='Descrição' />

        <button type='submit' data-testid='edit-product-button'>
          <div className='text'>Editar Produto</div>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditProduct
