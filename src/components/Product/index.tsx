import React from 'react'

import { FiEdit3, FiTrash } from 'react-icons/fi'

import { Container } from './styles'

interface IProductItem {
  id: number
  name: string
  image: string
  price: string
  description: string
}

interface IProps {
  product: IProductItem
  handleDelete: (id: number) => {}
  handleEditProduct: (product: IProductItem) => void
}

const Product: React.FC<IProps> = ({
  product,
  handleDelete,
  handleEditProduct
}: IProps) => {
  function setEditingProduct(): void {
    handleEditProduct(product)
  }

  return (
    <Container>
      <header>
        <img src={product.image} alt={product.name} />
      </header>
      <section className='body'>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className='price'>
          R$
          <b> {product.price} </b>
        </p>
      </section>
      <section className='footer'>
        <div className='icon-container'>
          <button
            type='button'
            className='icon'
            onClick={() => setEditingProduct()}
            data-testid={`edit-product-${product.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type='button'
            className='icon'
            onClick={() => handleDelete(product.id)}
            data-testid={`remove-product-${product.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>
      </section>
    </Container>
  )
}

export default Product
