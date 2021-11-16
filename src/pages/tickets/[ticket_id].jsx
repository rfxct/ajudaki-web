import Image from 'next/image'
import { useRouter } from 'next/router'

import { Container, Col, Card, CardBody, CardTitle, Row, Input, Label, FormGroup, Form, Button } from 'reactstrap'
import Dashboard from '../../layouts/Dashboard'

import { displayDate } from '../../util/DateUtil'
import checkAuth from '../../util/CheckAuth'
import { getAPIClient } from '../../services/axios'

export default function Ticket({ user, ticket }) {
  return (
    // `Ticket #${ticket_id} ${ticket.subject}`
    <Dashboard brandText={ticket.subject} user={user}>
      <Container className="pb-8 pt-5 pt-md-8" fluid>
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

              {ticket?.messages?.sort((a, b) => a.created_at - b.created_at)?.map((topic, i) => {
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

              <Form className="mt-5">
                <FormGroup>
                  <Label for="answer">Responder</Label>
                  <Input type="textarea" name="answer" id="answer" />
                </FormGroup>

                <Button
                  className="float-right"
                  color="primary"
                  onClick={e => {
                    // const form = document.forms[0]
                    // const index = tickets.findIndex(t => t.id == ticket.id)

                    // ticket.timeline.unshift({
                    //   avatar: 'https://avatars.dicebear.com/v2/initials/Marcos.svg',
                    //   topic?.author.full_name: 'Marcos',
                    //   description: form.answer.value,
                    //   created_at: Date.now()
                    // })
                    // tickets.splice(index, 1)

                    // const newTickets = [...tickets, ticket]

                    // setTickets(newTickets)

                    // form.reset()
                  }}
                >Responder</Button>
              </Form>
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