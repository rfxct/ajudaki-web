import 'react-toastify/dist/ReactToastify.css'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'

import { Badge, Container, Col, Card, CardBody, CardTitle, Row, FormGroup, Button, Spinner } from 'reactstrap'
import Dashboard from '../../layouts/Dashboard'
import { api } from '../../services/api'

import { displayDate } from '../../util/DateUtil'
import { colorMap } from '../../util/StatusColor'
import checkAuth from '../../util/CheckAuth'
import { getAPIClient } from '../../services/axios'

export default function Ticket({ user, ticket: ssTicket, ticketMessages }) {
  const [loading, setLoading] = useState(false)
  const [ticket, setTicket] = useState(ssTicket)
  const [messages, setMessages] = useState(ticketMessages)

  const { register, reset, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    setTicket(ticket)
    setMessages(ticketMessages)
  }, [])

  function handleErrors() {
    for (const type in errors) {
      toast.error(errors[type].message)
    }
  }

  async function handleTicket(action) {
    setLoading(true)

    try {
      const { data } = await api.post(`tickets/${ticket.id}/${action}`)
      setTicket(data)

      toast.success(`Ticket ${action === 'accept' ? 'aceito' : 'finalizado'} com sucesso`)
    } catch (e) {
      toast.error(e.response.errors[0].message)
    }

    setLoading(false)
  }

  async function onSubmit({ content }) {
    setLoading(true)

    try {
      const { data } = await api.post(`tickets/${ticket.id}/messages`, { content })

      setMessages([...messages, data])
      reset({ keepDirty: false })

      toast.success('Resposta enviada com sucesso')
    } catch (e) {
      if (e.response.status === 403) return toast.error('Você precisa aceitar o ticket para respondê-lo')
      toast.error('Ocorreu um erro ao responder o ticket')
    }

    setLoading(false)
  }

  return (
    <Dashboard brandText={ticket.subject} user={user}>
      <Container className="pb-8 pt-5 pt-md-8" fluid>
        <ToastContainer />
        <h1>{ticket?.subject || 'Ticket não encontrado'}</h1>

        {/* Ticket info */}
        <section className="ticket-container">
          <Col sm={12} md={12} lg={8}>
            <hr />
            <Card className={
              `w-100 mb-2 ${ticket.created_by === user.id ? 'b-left border-primary' : ''}`
            }>
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

            {messages.map((topic, i) => (
              <Card className={
                `w-100 mb-2 ${topic.author_id === user.id ? 'b-left border-primary' : ''}`
              } key={i}>
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
            ))}

            {([ticket.assigned_to, ticket.created_by].includes(user.id) && !ticket.finished) && (
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
            )}
          </Col>

          {/* Informações */}
          <Col sm={12} md={12} lg={4}>
            <hr style={{ visibility: 'hidden' }} />
            <Card className="w-100 mb-2">
              <CardBody>
                <div className="mb-3">
                  <h4>Status</h4>
                  <Badge color={colorMap[ticket.status]} className="mr-4">
                    {ticket?.status || 'indefinido'}
                  </Badge>
                </div>
                <div className="mb-3">
                  <h4>Solicitante</h4>
                  <span>{ticket?.creator?.full_name}</span>
                </div>
                <div className="mb-3">
                  <h4>Criado em</h4>
                  <span>{displayDate(ticket.created_at)}</span>
                </div>
                <div className="mb-3">
                  <h4>Atualizado em</h4>
                  <span>{displayDate([...messages].pop()?.created_at || ticket?.created_at)}</span>
                </div>
                <div className="mb-3">
                  {
                    !ticket.finished && (
                      ticket.assigned_to === user.id
                        ? (
                          <Button color="danger" disabled={loading} onClick={() => handleTicket('finish')}>
                            Finalizar ticket
                          </Button>
                        ) : (
                          <Button color="success" disabled={loading} onClick={() => handleTicket('accept')}>
                            Aceitar ticket
                          </Button>
                        )
                    )
                  }
                </div>
              </CardBody>
            </Card>
          </Col>
        </section>

      </Container>
    </Dashboard>
  )
}

export async function getServerSideProps(ctx) {
  const user = await checkAuth(ctx)

  if (!user) return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
    props: {}
  }

  const apiClient = getAPIClient(ctx)

  const { data: ticket } = await apiClient.get(`/tickets/${ctx.query.ticket_id}`).catch(() => { })
  if (!ticket) return {
    redirect: {
      destination: '/tickets/@me',
      permanent: false,
    },
    props: {}
  }

  const { data: ticketMessages } = await apiClient.get(`/tickets/${ticket.id}/messages`).catch(() => [])

  return { props: { user, ticket, ticketMessages } }
}