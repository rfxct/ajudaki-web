import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'

import Dashboard from '../../layouts/Dashboard'
import { api } from '../../services/api'

import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  FormGroup,
  Button
} from 'reactstrap'

import checkAuth from '../../util/CheckAuth'

export default function NovoTicket({ user }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, reset, handleSubmit, formState: { errors } } = useForm()

  function handleErrors() {
    for (const type in errors) {
      toast.error(errors[type].message)
    }
  }

  async function onSubmit({ subject, description }) {
    setLoading(true)

    try {
      const { data } = await api.post('tickets', { subject, description })
      reset({ keepDirty: false })

      router.push(`/tickets/${data.id}`)
    } catch {
      toast.error('Preencha os campos corretamente')
    }

    setLoading(false)
  }

  return (
    <Dashboard user={user}>
      <Container className="pb-8 pt-5 pt-md-8" fluid>
        <ToastContainer />
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Novo Ticket</h3>
              </CardHeader>

              <CardBody>
                <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
                  <FormGroup>
                    <label htmlFor="subject-input">Título <span style={{ color: "red" }}>*</span></label>
                    <input
                      className='form-control'
                      {...register('subject', { required: 'O título não pode estar vazio' })}
                      placeholder='Insira o título/assunto'
                      type='text'
                      id="subject-input"
                      disabled={loading}
                      required={true}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="description-input">Descrição <span style={{ color: "red" }}>*</span></label>
                    <textarea
                      className='form-control'
                      {...register('description', { required: 'A descrição não pode estar vazia' })}
                      placeholder='Descreva o seu problema'
                      rows='3'
                      id="description-input"
                      disabled={loading}
                      required={true}
                    />
                  </FormGroup>

                  <Button
                    type="submit"
                    disabled={loading}
                    color='primary'
                  >
                    Enviar
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container >
    </Dashboard >
  );
}

export async function getServerSideProps(ctx) {
  const user = await checkAuth(ctx)
  
  if (!user || user.role !== 'default') return {
    redirect: {
      destination: '/login',
      permanent: false,
    }
  }

  return { props: { user } }
}