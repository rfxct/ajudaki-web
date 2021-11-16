import 'react-toastify/dist/ReactToastify.css'

import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'

import { Container, Col, Card, CardBody, CardTitle, Row, FormGroup, Button } from 'reactstrap'
import Dashboard from '../../layouts/Dashboard'
import { api } from '../../services/api'

import { displayDate } from '../../util/DateUtil'
import checkAuth from '../../util/CheckAuth'
import { getAPIClient } from '../../services/axios'

export default function Ticket({ user, ticket }) {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState(ticket.messages)
  const { register, reset, handleSubmit, formState: { errors } } = useForm()

  function handleErrors() {
    for (const type in errors) {
      toast.error(errors[type].message)
    }
  }

  async function onSubmit({ content }) {
    setLoading(true)

    try {
      const { data } = await api.post(`tickets/${ticket.id}/messages`, { content })
      toast.success('Resposta enviada com sucesso')
      setMessages([...messages, data])
      reset({ keepDirty: false })
    } catch (e) {
      console.log(e)
      toast.error('Preencha os campos corretamente')
    }

    setLoading(false)
  }

  return (
    <Dashboard brandText={ticket.subject} user={user}>
      <Container className="pb-8 pt-5 pt-md-8" fluid>
        <ToastContainer />
        <h1>{ticket?.subject || 'Ticket não encontrado'}</h1>
        {ticket && (
          <Row>
            <Col xs={8}>
              <hr />
              <Card className="mb-2">
                <CardBody>
                  <Row className="mb-4">
                    <Col xs='auto'>
                      <Image
                        className="rounded-circle"
                        width="40px" height="40px"
                        src={`https://avatars.dicebear.com/v2/initials/${ticket?.creator?.full_name || ''}.svg`}
                        alt={`#description#${ticket?.creator?.full_name}`}
                      />
                    </Col>
                    {/* Topic Author info */}
                    <Col className='pl-0'>
                      <CardTitle className="text-dark font-weight-bold mb-0">
                        {ticket?.creator?.full_name || 'Desconhecido'}
                      </CardTitle>
                      <span className="text-muted h5 mb-0">
                        {displayDate(ticket?.created_at)}
                      </span>
                    </Col>
                  </Row>

                  {ticket?.description.split('\n').map((paragraph, i) => (
                    <p key={i} className="font-weight-normal text-sm">
                      {paragraph}
                    </p>
                  ))}
                </CardBody>
              </Card>

              {messages?.sort((a, b) => a.created_at - b.created_at)?.map((topic, i) => {
                return (
                  <Card className="mb-2" key={i}>
                    <CardBody>
                      <Row className="mb-4">
                        <Col xs='auto'>
                          <Image
                            className="rounded-circle"
                            width="40px" height="40px"
                            src={`https://avatars.dicebear.com/v2/initials/${topic?.author.full_name || ''}.svg`}
                            alt={`#${i}#${topic?.author.full_name}`}
                          />
                        </Col>
                        {/* Topic Author info */}
                        <Col className='pl-0'>
                          <CardTitle className="text-dark font-weight-bold mb-0">
                            {topic?.author.full_name}
                          </CardTitle>
                          <span className="text-muted h5 mb-0">
                            {displayDate(topic.created_at)}
                          </span>
                        </Col>
                      </Row>

                      {topic.content.split('\n').map((paragraph, i) => (
                        <p key={i} className="font-weight-normal text-sm">
                          {paragraph}
                        </p>
                      ))}
                    </CardBody>
                  </Card>
                )
              })}

              <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
                <FormGroup>
                  <label htmlFor="content-input">Responder</label>
                  <textarea
                    className='form-control'
                    {...register('content', { required: 'A resposta não pode estar vazia' })}
                    placeholder='Escreva sua resposta'
                    rows='3'
                    id="content-input"
                    disabled={loading}
                    required={true}
                  />
                </FormGroup>

                <Button
                  className="float-right"
                  color="primary"
                  type="submit"
                >
                  Enviar
                </Button>
              </form>
            </Col>
            <Col xs={4}>
              <hr style={{ visibility: 'hidden' }} />
              <Card className="mb-2">
                <CardBody>
                  <div className="mb-3">
                    <h4>Solicitante</h4>
                    <span>{ticket.creator.full_name}</span>
                  </div>
                  <div className="mb-3">
                    <h4>Criado em</h4>
                    <span>{displayDate(ticket.created_at)}</span>
                  </div>
                  <div className="mb-3">
                    <h4>Atualizado em</h4>
                    <span>{displayDate(ticket.updated_at)}</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Dashboard>
  )
}


export async function getServerSideProps(ctx) {
  const user = await checkAuth(ctx)

  const apiClient = getAPIClient(ctx)
  const { data } = await apiClient.get(`/tickets/${ctx.query.ticket_id}`).catch(() => [])

  if (!user) return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
    props: {}
  }

  return { props: { user, ticket: data ?? {} } }
}