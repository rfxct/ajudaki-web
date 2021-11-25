import 'react-toastify/dist/ReactToastify.css'

import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'

import { ToastContainer, toast } from 'react-toastify'
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa'

import {
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from 'reactstrap'

import Brand from '../components/Brand'
import { AuthContext } from '../contexts/auth'

import checkAuth from '../util/CheckAuth'

export default function Registro() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { registerAccount } = useContext(AuthContext)

  function handleErrors() {
    for (const type in errors) {
      toast.error(errors[type].message)
    }
  }

  async function onSubmit(credentials) {
    setLoading(true)

    const result = await registerAccount(credentials)
    if (result?.length) {
      for (const e of result) toast.error(e.message)
    }

    setLoading(false)
  }

  return (
    <div className="main-content bg-default h-100 d-flex align-items-center">
      <Container>
        <ToastContainer />
        <Row className="justify-content-center">
          <Col lg='5' md='7'>
            <Card className='bg-secondary shadow border-0'>
              <CardHeader className='bg-transparent pb-1'>
                <div className="d-flex justify-content-center">
                  <Brand />
                </div>
                <div className='text-muted text-center mt-2 mb-3'>
                  <small>Registre-se</small>
                </div>
              </CardHeader>
              <CardBody className='px-lg-5 py-lg-5'>
                <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
                  {/* Nome */}
                  <FormGroup className='mb-3'>
                    <InputGroup className='input-group-alternative'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <FaUserAlt />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        {...register('first_name', { required: 'O nome não pode estar vazio' })}
                        placeholder='Nome'
                        type="text"
                        id="first_name-input"
                        disabled={loading}
                        required={true}
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* Sobrenome */}
                  <FormGroup className='mb-3'>
                    <InputGroup className='input-group-alternative'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <FaUserAlt />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        {...register('last_name', { required: 'O sobrenome não pode estar vazio' })}
                        placeholder='Sobrenome'
                        type="text"
                        id="last_name-input"
                        disabled={loading}
                        required={true}
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* Email */}
                  <FormGroup className='mb-3'>
                    <InputGroup className='input-group-alternative'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <FaEnvelope />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        {...register('email', { required: 'O e-mail não pode estar vazio' })}
                        placeholder='Email'
                        type="email"
                        id="email-input"
                        disabled={loading}
                        required={true}
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* Senha */}
                  <FormGroup>
                    <InputGroup className='input-group-alternative'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <FaLock />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        {...register('password', { required: 'A senha não pode estar vazia' })}
                        placeholder='Senha'
                        id='password-input'
                        type="password"
                        disabled={loading}
                        required={true}
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* Confirmar senha */}
                  <FormGroup>
                    <InputGroup className='input-group-alternative'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <FaLock />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        {...register('password_confirmation', { required: 'A confirmação de senha não pode estar vazia' })}
                        placeholder='Confirme a senha'
                        id='password_confirmation-input'
                        type="password"
                        disabled={loading}
                        required={true}
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* Enviar */}
                  <div className='text-center'>
                    <Button
                      type="submit" disabled={loading}
                      className='my-4' color='primary'
                    >
                      Cadastrar
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const user = await checkAuth(ctx)
  if (user) return {
    redirect: {
      destination: '/tickets/@me',
      permanent: false
    }
  }
  return { props: {} }
}