import Image from 'next/image'
import { useRouter } from 'next/router'
import { useLocalStorage } from '../../hooks'

import { Container, Col, Card, CardBody, CardTitle, Row, Input, Label, FormGroup, Form, Button } from 'reactstrap'
import { Dashboard } from '../../layouts'

import { Long } from '../../util/DateUtil'

export default function Ticket({ }) {
  const router = useRouter()
  const { ticket_id } = router.query

  const [tickets, setTickets] = useLocalStorage('tickets', [])

  const ticketData = tickets.find(t => t.id == ticket_id)
  
  return (
    <Dashboard brandText={`Ticket #${ticket_id}`}>
      <Container className="pb-8 pt-5 pt-md-8" fluid>
        <h1>{ticketData?.subject || 'Ticket não encontrado'}</h1>

        {ticketData && (
          <Row>
            <Col xs={8}>
              {ticketData.timeline.sort((a, b) => a.createdAt - b.createdAt).map((topic, i) => (
                <Card className="mb-2" key={i}>
                  <CardBody>
                    <Row className="mb-4">
                      <Col xs='auto'>
                        <Image
                          className="rounded-circle"
                          width="40px" height="40px"
                          src={topic.avatar}
                          alt={`#${i}#${topic.username}`}
                        />
                      </Col>
                      {/* Topic Author info */}
                      <Col className='pl-0'>
                        <CardTitle className="text-dark font-weight-bold mb-0">
                          {topic.username}
                        </CardTitle>
                        <span className="text-muted h5 mb-0">
                          {Long.format(topic.createdAt)}
                        </span>
                      </Col>
                    </Row>

                    {topic.description.split('\n').map((paragraph, i) => (
                      <p key={i} className="font-weight-normal text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </CardBody>
                </Card>
              ))}

              <Form className="mt-5">
                <FormGroup>
                  <Label for="answer">Responder</Label>
                  <Input type="textarea" name="answer" id="answer" />
                </FormGroup>

                <Button
                  className="float-right"
                  color="primary"
                  onClick={e => {
                    const form = document.forms[0]
                    const index = tickets.findIndex(t => t.id == ticketData.id)

                    ticketData.timeline.unshift({
                      avatar: 'https://avatars.dicebear.com/v2/initials/Marcos.svg',
                      username: 'Marcos',
                      description: form.answer.value,
                      createdAt: Date.now()
                    })
                    tickets.splice(index, 1)

                    const newTickets = [...tickets, ticketData]

                    setTickets(newTickets)

                    form.reset()
                  }}
                >Responder</Button>
              </Form>
            </Col>
            <Col xs={4}>
              <div className="mb-3">
                <h4>Solicitante</h4>
                <span>{ticketData.username}</span>
              </div>
              <div className="mb-3">
                <h4>Criado em</h4>
                <span>{Long.format(ticketData.createdAt)}</span>
              </div>
              <div className="mb-3">
                <h4>Atualizado em</h4>
                <span>{Long.format(ticketData.updatedAt)}</span>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </Dashboard>
  )
}
