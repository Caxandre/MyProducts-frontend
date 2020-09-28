import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiUser, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/newlogo.png'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Content, AnimationContainer } from './styles'

interface SingUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: SingUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(8, 'No mínimo 8 dígitos')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await api.post('/users', data)

        history.push('/')

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
          description: 'Você já pode fazer seu logon no Gobarber!'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro durante o cadastro, cheque suas informações e tente novamente.'
        })
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt='BoBarber' />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name='name' icon={FiUser} placeholder='Nome' />
            <Input name='email' icon={FiMail} placeholder='E-mail' />
            <Input
              name='password'
              icon={FiLock}
              type='password'
              placeholder='Senha'
            />
            <Button type='submit'>Cadastrar</Button>
          </Form>
          <Link to='/'>
            <FiLogIn />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
