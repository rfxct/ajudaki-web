import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap'

export default function Login() {
  useEffect(() => document.body.classList.add('bg-default'), [])

  return (
    <div className="main-content h-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col lg='5' md='7'>
            <Card className='bg-secondary shadow border-0'>
              <CardHeader className='bg-transparent pb-1'>
                <div className="d-flex justify-content-center">
                  <Image src="/img/brand/logo.png" loading="lazy" alt="AjudAki" width='128px' height='40px' />
                </div>
                <div className='text-muted text-center mt-2 mb-3'>
                  <small>Conecte-se</small>
                </div>
              </CardHeader>
              <CardBody className='px-lg-5 py-lg-5'>
                <Form role='form'>
                  <FormGroup className='mb-3'>
                    <InputGroup className='input-group-alternative'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='ni ni-email-83' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder='E-mail'
                        type='email'
                        autoComplete='new-email'
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
                      <Input
                        placeholder='Senha'
                        type='password'
                        autoComplete='new-password'
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className='text-center'>
                    <Link href="/tickets/@me">
                      <a>
                        <Button className='my-4' color='primary' type='button'>
                          Conectar
                        </Button>
                      </a>
                    </Link>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className='mt-3'>
              <Col xs='6'>
                <a
                  className='text-light'
                  href='#'
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Esqueceu a senha?</small>
                </a>
              </Col>
              <Col className='text-right' xs='6'>
                <a
                  className='text-light'
                  href='#'
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Criar nova conta</small>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
