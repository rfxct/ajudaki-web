import 'react-toastify/dist/ReactToastify.css'

import { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'

import { ToastContainer, toast } from 'react-toastify'
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

export default function Login() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn } = useContext(AuthContext)

  function handleErrors() {
    for (const type in errors) {
      toast.error(errors[type].message)
    }
  }

  async function onSubmit({ email, password }) {
    setLoading(true)

    const result = await signIn({ email, password })
    if (result) toast.error(result)

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
                  <small>Conecte-se</small>
                </div>
              </CardHeader>
              <CardBody className='px-lg-5 py-lg-5'>
                <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
                  <FormGroup className='mb-3'>
                    <InputGroup className='input-group-alternative'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='ni ni-email-83' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        {...register('email', { required: 'O e-mail não pode estar vazio' })}
                        placeholder='seunome@domínio.tld'
                        type="email"
                        id="email-input"
                        disabled={loading}
                        required={true}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className='input-group-alternative'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='ni ni-lock-circle-open' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        {...register('password', { required: 'A senha não pode estar vazia' })}
                        placeholder='*************'
                        id='password-input'
                        type="password"
                        disabled={loading}
                        required={true}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className='text-center'>
                    <Button
                      type="submit" disabled={loading}
                      className='my-4' color='primary'
                    >
                      Conectar
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