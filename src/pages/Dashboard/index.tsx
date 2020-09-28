import React, { useState, useEffect } from 'react'

import { FiPlusSquare, FiPower } from 'react-icons/fi'

import api from '../../services/api'

import Product from '../../components/Product'
import ModalAddProduct from '../../components/ModalAddProduct'
import ModalEditProduct from '../../components/ModalEditProduct'
import logoImg from '../../assets/newlogo.png'
import { useAuth } from '../../hooks/auth'
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Title,
  ProductsContainer
} from './styles'

interface IProductItem {
  id: number
  name: string
  image: string
  price: string
  description: string
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  const [products, setProducts] = useState<IProductItem[]>([])
  const [editingProduct, setEditingProduct] = useState<IProductItem>(
    {} as IProductItem
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('products')
      setProducts(response.data)
    }
    loadProducts()
  }, [])

  async function handleAddProduct(
    product: Omit<IProductItem, 'id'>
  ): Promise<void> {
    try {
      const response = await api.post('/products', {
        ...product
      })

      setProducts([...products, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateProduct(
    product: Omit<IProductItem, 'id'>
  ): Promise<void> {
    try {
      const { id } = editingProduct

      const response = await api.put(`/products/${id}`, {
        ...product,
        id
      })

      setProducts(
        products.map((mappedProduct) =>
          mappedProduct.id === id ? { ...response.data } : mappedProduct
        )
      )
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`)

    setProducts(products.filter((product) => product.id !== id))
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen)
  }

  function handleEditProduct(product: IProductItem): void {
    toggleEditModal()
    setEditingProduct(product)
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt='GoBarber' />

          <Profile>
            <div>
              <span>
                Bem-vindo, <strong>{user.name}</strong>
              </span>
            </div>
          </Profile>

          <button type='button' onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <ModalAddProduct
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddProduct={handleAddProduct}
      />
      <ModalEditProduct
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingProduct={editingProduct}
        handleUpdateProduct={handleUpdateProduct}
      />
      <Content>
        <Title>
          <h1>my products list</h1>
          <button type='button' onClick={toggleModal}>
            <div className='text'>Novo Produto</div>
            <div className='icon'>
              <FiPlusSquare size={24} />
            </div>
          </button>
        </Title>

        <ProductsContainer data-testid='products-list'>
          {products &&
            products.map((product) => (
              <Product
                key={product.id}
                product={product}
                handleDelete={handleDeleteProduct}
                handleEditProduct={handleEditProduct}
              />
            ))}
        </ProductsContainer>
      </Content>
    </Container>
  )
}

export default Dashboard
