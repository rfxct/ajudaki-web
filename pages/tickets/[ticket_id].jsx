import Image from 'next/image'
import { useRouter } from 'next/router'
import { useLocalStorage } from '../../hooks'

import { Container, Col, Card, CardBody, CardTitle, Row } from 'reactstrap'
import { Dashboard } from '../../layouts'

import { Long } from '../../util/DateUtil'

export default function Ticket({ }) {
  const router = useRouter()
  const { ticket_id } = router.query

  const [tickets] = useLocalStorage('tickets', [])
  
  const ticketData = tickets.find(t => t.id == ticket_id)

  return (
    <Dashboard brandText={`Ticket #${ticket_id}`}>
      <Container className="bg-gradient-dark h-100 pb-8 pt-5 pt-md-8" fluid>
        <h1 className="text-light">{ticketData?.subject || 'Ticket não encontrado'}</h1>

        {ticketData && ticketData.timeline.sort((a, b) => b.createdAt - a.createdAt).map((topic, i) => (
          <Card className="mb-2" key={i}>
            <CardBody>
              <Row>
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
              <p className="mt-3 mb-0 text-sm">
                {topic.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </Container>
    </Dashboard>
  )
}
